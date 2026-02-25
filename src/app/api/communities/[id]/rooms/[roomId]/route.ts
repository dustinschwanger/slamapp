import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; roomId: string }> }
) {
  try {
    const { id, roomId } = await params;
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate community ownership
    const community = await db.community.findUnique({
      where: { id },
    });

    if (!community || community.churchId !== ctx.churchId) {
      throw new AuthError("Community not found", 404);
    }

    // Validate room belongs to community
    const room = await db.room.findUnique({
      where: { id: roomId },
    });

    if (!room || room.communityId !== id) {
      throw new AuthError("Room not found", 404);
    }

    await db.room.delete({
      where: { id: roomId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
