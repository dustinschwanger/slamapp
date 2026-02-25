import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

const VALID_ROLES = ["admin", "leader", "volunteer", "member"] as const;

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requireRole("admin");
    const { id } = await params;

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { role } = body;

    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify user belongs to same church
    const user = await db.user.findUnique({ where: { id } });

    if (!user || user.churchId !== ctx.churchId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updated = await db.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requireRole("admin");
    const { id } = await params;

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Verify user belongs to same church
    const user = await db.user.findUnique({ where: { id } });

    if (!user || user.churchId !== ctx.churchId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove from church by setting churchId to null and role to member
    await db.user.update({
      where: { id },
      data: { churchId: null, role: "member" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
