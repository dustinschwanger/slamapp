import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET() {
  try {
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const users = await db.user.findMany({
      where: {
        churchId: ctx.churchId,
      },
      include: {
        groupMemberships: {
          include: {
            group: { select: { name: true } },
          },
        },
      },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    });

    const isPrivileged =
      ctx.role === "admin" || ctx.role === "leader" || ctx.role === "super_admin";

    const volunteers = users.map((user) => {
      const initials =
        `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: isPrivileged ? user.email : undefined,
        phone: isPrivileged ? (user.phone ?? "") : undefined,
        role: user.role,
        groups: user.groupMemberships.map((gm) => gm.group.name),
        initials,
        joinedDate: user.createdAt.toISOString().split("T")[0],
        isPending: user.clerkId.startsWith("pending_"),
      };
    });

    return NextResponse.json({ volunteers });
  } catch (error) {
    return handleApiError(error);
  }
}
