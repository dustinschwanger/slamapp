import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import type { UserRole } from "@/lib/types";

const VALID_ROLES: UserRole[] = [
  "super_admin",
  "admin",
  "leader",
  "volunteer",
  "member",
];

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
    const { email, firstName, lastName, role, churchId } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "email, firstName, and lastName are required" },
        { status: 400 }
      );
    }

    const userRole = role || "member";
    if (!VALID_ROLES.includes(userRole as UserRole)) {
      return NextResponse.json(
        { error: `role must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if user with that email already exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // If churchId provided, validate it exists
    if (churchId) {
      const church = await db.church.findUnique({ where: { id: churchId } });
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
        email: email.trim().toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: userRole,
        churchId: churchId || null,
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
