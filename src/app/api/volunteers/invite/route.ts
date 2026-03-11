import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address").max(254),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  role: z.enum(["admin", "leader", "volunteer", "member"]),
});

export async function POST(req: Request) {
  try {
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = inviteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const { email, firstName, lastName, role } = parsed.data;

    // Check if user with that email already exists
    const existing = await db.user.findUnique({ where: { email } });

    if (existing) {
      // Already in this church
      if (existing.churchId === ctx.churchId) {
        return NextResponse.json(
          { error: "This user is already a member of your church" },
          { status: 409 }
        );
      }

      // Exists but not in a church — claim them
      if (existing.churchId === null) {
        const updated = await db.user.update({
          where: { id: existing.id },
          data: { churchId: ctx.churchId, role },
        });
        return NextResponse.json(updated);
      }

      // Belongs to a different church
      return NextResponse.json(
        { error: "This user is already assigned to another church" },
        { status: 409 }
      );
    }

    // Create a pre-invited user with a pending clerkId
    const user = await db.user.create({
      data: {
        clerkId: `pending_${randomUUID()}`,
        email,
        firstName,
        lastName,
        role,
        churchId: ctx.churchId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return handleApiError(error);
  }
}
