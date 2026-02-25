import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

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
