import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";
import { roleLabels, type VolunteerRole } from "@/lib/types";

const updateShiftSchema = z.object({
  communityId: z.string().uuid().optional(),
  roomId: z.string().uuid().nullable().optional(),
  groupId: z.string().uuid().nullable().optional(),
  shiftDate: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  roleNeeded: z.string().optional(),
  maxVolunteers: z.number().int().min(1).max(50).optional(),
  notes: z.string().nullable().optional(),
});

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

function mapShift(shift: {
  id: string;
  shiftDate: Date;
  startTime: string;
  endTime: string;
  roleNeeded: string;
  maxVolunteers: number;
  notes: string | null;
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
    notes: shift.notes,
    signedUpIds: shift.signups.map((s) => s.userId),
    signedUpNames: shift.signups.map(
      (s) => `${s.user.firstName} ${s.user.lastName}`
    ),
  };
}

async function getShiftForChurch(id: string, churchId: string) {
  const shift = await db.volunteerShift.findUnique({
    where: { id },
    include: shiftInclude,
  });

  if (!shift) {
    throw new AuthError("Shift not found", 404);
  }

  if (shift.churchId !== churchId) {
    throw new AuthError("Shift not found", 404);
  }

  return shift;
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

    const shift = await getShiftForChurch(id, ctx.churchId);
    return NextResponse.json(mapShift(shift));
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

    // Validate ownership
    await getShiftForChurch(id, ctx.churchId);

    const body = await request.json();
    const parsed = updateShiftSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = {};

    if (data.communityId !== undefined) updateData.communityId = data.communityId;
    if (data.roomId !== undefined) updateData.roomId = data.roomId;
    if (data.groupId !== undefined) updateData.groupId = data.groupId;
    if (data.shiftDate !== undefined) updateData.shiftDate = new Date(data.shiftDate);
    if (data.startTime !== undefined) updateData.startTime = data.startTime;
    if (data.endTime !== undefined) updateData.endTime = data.endTime;
    if (data.roleNeeded !== undefined) updateData.roleNeeded = data.roleNeeded;
    if (data.maxVolunteers !== undefined) updateData.maxVolunteers = data.maxVolunteers;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await db.volunteerShift.update({
      where: { id },
      data: updateData,
      include: shiftInclude,
    });

    return NextResponse.json(mapShift(updated));
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
    const ctx = await requireRole("leader");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate ownership
    await getShiftForChurch(id, ctx.churchId);

    await db.volunteerShift.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
