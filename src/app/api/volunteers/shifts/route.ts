import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";
import { roleLabels, type VolunteerRole } from "@/lib/types";

const createShiftSchema = z.object({
  communityId: z.string().uuid("Invalid community ID"),
  roomId: z.string().uuid("Invalid room ID").optional(),
  groupId: z.string().uuid("Invalid group ID").optional(),
  shiftDate: z.string().min(1, "Shift date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  roleNeeded: z.string().min(1, "Role is required"),
  maxVolunteers: z.number().int().min(1).max(50).default(5),
  notes: z.string().optional(),
});

function mapShift(shift: {
  id: string;
  shiftDate: Date;
  startTime: string;
  endTime: string;
  roleNeeded: string;
  maxVolunteers: number;
  community: { name: string } | null;
  room: { name: string } | null;
  signups: {
    userId: string;
    user: { firstName: string; lastName: string };
  }[];
}) {
  const role = shift.roleNeeded as VolunteerRole;
  return {
    id: shift.id,
    date: shift.shiftDate.toISOString().split("T")[0],
    startTime: shift.startTime,
    endTime: shift.endTime,
    communityName: shift.community?.name ?? "",
    room: shift.room?.name ?? "",
    role,
    roleLabel: roleLabels[role] ?? shift.roleNeeded,
    maxVolunteers: shift.maxVolunteers,
    signedUpIds: shift.signups.map((s) => s.userId),
    signedUpNames: shift.signups.map(
      (s) => `${s.user.firstName} ${s.user.lastName}`
    ),
  };
}

const shiftInclude = {
  community: { select: { name: true } },
  room: { select: { name: true } },
  signups: {
    select: {
      userId: true,
      user: { select: { firstName: true, lastName: true } },
    },
  },
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

    const { searchParams } = request.nextUrl;
    const upcoming = searchParams.get("upcoming") === "true";
    const communityId = searchParams.get("communityId");
    const userId = searchParams.get("userId");

    const where: Record<string, unknown> = {
      churchId: ctx.churchId,
    };

    if (upcoming) {
      where.shiftDate = {
        gte: new Date(new Date().toISOString().split("T")[0]),
      };
    }

    if (communityId) {
      where.communityId = communityId;
    }

    if (userId) {
      where.signups = {
        some: { userId },
      };
    }

    const shifts = await db.volunteerShift.findMany({
      where,
      include: shiftInclude,
      orderBy: [{ shiftDate: "asc" }, { startTime: "asc" }],
    });

    return NextResponse.json({ shifts: shifts.map(mapShift) });
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
    const parsed = createShiftSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Validate community belongs to church
    const community = await db.community.findUnique({
      where: { id: data.communityId },
      select: { churchId: true },
    });

    if (!community || community.churchId !== ctx.churchId) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 }
      );
    }

    // Validate room belongs to community if provided
    if (data.roomId) {
      const room = await db.room.findUnique({
        where: { id: data.roomId },
        select: { communityId: true },
      });

      if (!room || room.communityId !== data.communityId) {
        return NextResponse.json(
          { error: "Room not found in this community" },
          { status: 404 }
        );
      }
    }

    const shift = await db.volunteerShift.create({
      data: {
        communityId: data.communityId,
        roomId: data.roomId ?? null,
        groupId: data.groupId ?? null,
        shiftDate: new Date(data.shiftDate),
        startTime: data.startTime,
        endTime: data.endTime,
        roleNeeded: data.roleNeeded,
        maxVolunteers: data.maxVolunteers,
        notes: data.notes ?? null,
        createdById: ctx.userId,
        churchId: ctx.churchId,
      },
      include: shiftInclude,
    });

    return NextResponse.json(mapShift(shift), { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
