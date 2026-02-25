import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const addMemberSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  role: z.enum(["leader", "member"]).optional().default("member"),
});

const removeMemberSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

async function validateGroupOwnership(groupId: string, churchId: string) {
  const group = await db.group.findUnique({
    where: { id: groupId },
  });

  if (!group || !group.isActive) {
    throw new AuthError("Group not found", 404);
  }

  if (group.churchId !== churchId) {
    throw new AuthError("Group not found", 404);
  }

  return group;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    await validateGroupOwnership(id, ctx.churchId);

    const members = await db.groupMember.findMany({
      where: { groupId: id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { joinedAt: "asc" },
    });

    const mapped = members.map((m) => ({
      id: m.id,
      userId: m.userId,
      groupRole: m.role,
      firstName: m.user.firstName,
      lastName: m.user.lastName,
      email: m.user.email,
      appRole: m.user.role,
      avatarUrl: m.user.avatarUrl,
      joinedAt: m.joinedAt.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ctx = await requireRole("leader");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    await validateGroupOwnership(id, ctx.churchId);

    const body = await request.json();
    const parsed = addMemberSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const { userId, role } = parsed.data;

    // Verify user belongs to the same church
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.churchId !== ctx.churchId) {
      return NextResponse.json(
        { error: "User not found in your church" },
        { status: 404 }
      );
    }

    // Check if already a member
    const existing = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User is already a member of this group" },
        { status: 409 }
      );
    }

    const member = await db.groupMember.create({
      data: {
        groupId: id,
        userId,
        role,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        id: member.id,
        userId: member.userId,
        groupRole: member.role,
        firstName: member.user.firstName,
        lastName: member.user.lastName,
        email: member.user.email,
        appRole: member.user.role,
        avatarUrl: member.user.avatarUrl,
        joinedAt: member.joinedAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ctx = await requireRole("leader");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    await validateGroupOwnership(id, ctx.churchId);

    const body = await request.json();
    const parsed = removeMemberSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const { userId } = parsed.data;

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });

    if (!membership) {
      return NextResponse.json(
        { error: "User is not a member of this group" },
        { status: 404 }
      );
    }

    await db.groupMember.delete({
      where: { groupId_userId: { groupId: id, userId } },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
