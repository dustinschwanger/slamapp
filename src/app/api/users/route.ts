import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole, getQueryChurchId } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

/**
 * GET /api/users — Church-scoped user list.
 * Requires at least "leader" role.
 * Regular users get their own church's users automatically.
 * Super admins must pass ?churchId=xxx.
 */
export async function GET(request: NextRequest) {
  try {
    await requireRole("leader");

    const { searchParams } = request.nextUrl;
    const churchId = await getQueryChurchId(searchParams.get("churchId"));

    const users = await db.user.findMany({
      where: { churchId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    });

    return NextResponse.json(users);
  } catch (error) {
    return handleApiError(error);
  }
}
