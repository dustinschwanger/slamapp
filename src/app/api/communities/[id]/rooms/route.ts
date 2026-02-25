import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  capacity: z.number().int().positive().nullable().optional(),
  hasProjector: z.boolean().optional(),
  notes: z.string().nullable().optional(),
});

async function validateCommunityOwnership(
  communityId: string,
  churchId: string
) {
  const community = await db.community.findUnique({
    where: { id: communityId },
  });

  if (!community) {
    throw new AuthError("Community not found", 404);
  }

  if (community.churchId !== churchId) {
    throw new AuthError("Community not found", 404);
  }

  return community;
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

    await validateCommunityOwnership(id, ctx.churchId);

    const rooms = await db.room.findMany({
      where: { communityId: id },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(rooms);
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
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    await validateCommunityOwnership(id, ctx.churchId);

    const body = await request.json();
    const parsed = createRoomSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const room = await db.room.create({
      data: {
        communityId: id,
        name: data.name,
        capacity: data.capacity ?? null,
        hasProjector: data.hasProjector ?? false,
        notes: data.notes ?? null,
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
