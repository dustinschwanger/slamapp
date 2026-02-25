import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createGroupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  communityId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  meetingDay: z.string().optional(),
  meetingTime: z.string().optional(),
});

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

const groupInclude = {
  community: { select: { name: true, address: true } },
  leader: { select: { id: true, firstName: true, lastName: true } },
  members: { select: { userId: true } },
  _count: { select: { members: true } },
} as const;

export async function GET(request: NextRequest) {
  try {
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const myGroups = searchParams.get("myGroups") === "true";

    const where: {
      churchId: string;
      isActive: boolean;
      members?: { some: { userId: string } };
    } = {
      churchId: ctx.churchId,
      isActive: true,
    };

    if (myGroups) {
      where.members = { some: { userId: ctx.userId } };
    }

    const groups = await db.group.findMany({
      where,
      include: groupInclude,
      orderBy: { name: "asc" },
    });

    return NextResponse.json(groups.map(mapGroup));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireRole("leader");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createGroupSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const group = await db.group.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        communityId: data.communityId ?? null,
        roomId: data.roomId ?? null,
        meetingDay: data.meetingDay ?? null,
        meetingTime: data.meetingTime ?? null,
        leaderId: ctx.userId,
        churchId: ctx.churchId,
        members: {
          create: {
            userId: ctx.userId,
            role: "leader",
          },
        },
      },
      include: groupInclude,
    });

    return NextResponse.json(mapGroup(group), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
