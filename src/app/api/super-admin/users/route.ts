import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email("Invalid email address").max(254),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  role: z.enum(["super_admin", "admin", "leader", "volunteer", "member"]).optional(),
  churchId: z.string().uuid().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const { searchParams } = new URL(request.url);
    const unassigned = searchParams.get("unassigned");

    const where: Record<string, unknown> = {};

    if (unassigned === "true") {
      where.churchId = null;
      where.role = { not: "super_admin" };
    }

    const users = await db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatarUrl: true,
        churchId: true,
        createdAt: true,
        church: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const userRole = data.role || "member";

    // Check if user with that email already exists
    const existing = await db.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // If churchId provided, validate it exists
    if (data.churchId) {
      const church = await db.church.findUnique({ where: { id: data.churchId } });
      if (!church) {
        return NextResponse.json(
          { error: "Church not found" },
          { status: 404 }
        );
      }
    }

    // Create a pre-invited user with a pending clerkId
    const user = await db.user.create({
      data: {
        clerkId: `pending_${randomUUID()}`,
        email: data.email.trim().toLowerCase(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        role: userRole,
        churchId: data.churchId || null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatarUrl: true,
        churchId: true,
        createdAt: true,
        church: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
          churchId: user.churchId,
          churchName: user.church?.name ?? null,
          createdAt: user.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
