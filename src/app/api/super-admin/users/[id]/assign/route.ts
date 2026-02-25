import { NextRequest, NextResponse } from "next/server";
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;

    const body = await request.json();
    const { churchId, role } = body;

    if (!churchId || typeof churchId !== "string") {
      return NextResponse.json(
        { error: "churchId is required" },
        { status: 400 }
      );
    }

    if (!role || !VALID_ROLES.includes(role as UserRole)) {
      return NextResponse.json(
        { error: `role must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate church exists
    const church = await db.church.findUnique({ where: { id: churchId } });
    if (!church) {
      return NextResponse.json(
        { error: "Church not found" },
        { status: 404 }
      );
    }

    // Update user with church assignment and role
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        churchId,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        churchId: true,
        church: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return handleApiError(error);
  }
}
