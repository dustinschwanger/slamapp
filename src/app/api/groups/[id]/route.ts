import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const updateGroupSchema = z.object({
  name: z.string().min(1, "Group name is required").optional(),
  description: z.string().nullable().optional(),
  communityId: z.string().uuid().nullable().optional(),
  roomId: z.string().uuid().nullable().optional(),
  meetingDay: z.string().nullable().optional(),
  meetingTime: z.string().nullable().optional(),
  leaderId: z.string().uuid().nullable().optional(),
});

const groupInclude = {
  community: { select: { name: true, address: true } },
  leader: { select: { id: true, firstName: true, lastName: true } },
  members: { select: { userId: true } },
  _count: { select: { members: true } },
} as const;

function mapGroup(group: {
  id: string;
  name: string;
  description: string | null;
  meetingDay: string | null;
  meetingTime: string | null;
  leaderId: string | null;
  community: { name: string; address: string } | null;
  leader: { id: string; firstName: string; lastName: string } | null;
  _count: { members: number };
  members: { userId: string }[];
}) {
  return {
    id: group.id,
    name: group.name,
    description: group.description ?? "",
    meetingDay: group.meetingDay ?? "",
    meetingTime: group.meetingTime ?? "",
    communityName: group.community?.name ?? "",
    communityAddress: group.community?.address ?? "",
    leaderName: group.leader
      ? `${group.leader.firstName} ${group.leader.lastName}`
      : "",
    leaderId: group.leaderId ?? "",
    memberCount: group._count.members,
    memberIds: group.members.map((m) => m.userId),
  };
}

async function getGroupForChurch(id: string, churchId: string) {
  const group = await db.group.findUnique({
    where: { id },
    include: groupInclude,
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

    const group = await getGroupForChurch(id, ctx.churchId);

    return NextResponse.json(mapGroup(group));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
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

    await getGroupForChurch(id, ctx.churchId);

    const body = await request.json();
    const parsed = updateGroupSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const updated = await db.group.update({
      where: { id },
      data: parsed.data,
      include: groupInclude,
    });

    return NextResponse.json(mapGroup(updated));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    await getGroupForChurch(id, ctx.churchId);

    await db.group.update({
      where: { id },
      data: { isActive: false },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
