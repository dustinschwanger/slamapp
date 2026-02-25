import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { roleLabels, type VolunteerRole } from "@/lib/types";

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
        role: {
          in: ["volunteer", "leader", "admin"],
        },
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

    const volunteers = users.map((user) => {
      const volunteerRole = (user.role === "admin" || user.role === "leader"
        ? "worship_leader"
        : "greeter") as VolunteerRole;

      const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

      // Only expose phone/email to admins and leaders
      const isPrivileged = ctx.role === "admin" || ctx.role === "leader" || ctx.role === "super_admin";

      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: isPrivileged ? user.email : undefined,
        phone: isPrivileged ? (user.phone ?? "") : undefined,
        role: volunteerRole,
        roleLabel: roleLabels[volunteerRole] ?? user.role,
        groups: user.groupMemberships.map((gm) => gm.group.name),
        initials,
        joinedDate: user.createdAt.toISOString().split("T")[0],
      };
    });

    return NextResponse.json({ volunteers });
  } catch (error) {
    return handleApiError(error);
  }
}
