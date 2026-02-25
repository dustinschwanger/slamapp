import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthContext();

    const request = await db.prayerRequest.findUnique({
      where: { id },
      include: {
        markings: { select: { userId: true } },
        room: { select: { id: true, name: true } },
      },
    });

    if (!request || (auth.churchId && request.churchId !== auth.churchId)) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: request.id,
      requesterName: request.requesterName,
      requestText: request.requestText,
      status: request.status,
      isAnonymous: request.isAnonymous,
      prayingCount: request.markings.length,
      prayingUserIds: request.markings.map((m) => m.userId),
      createdAt: request.createdAt.toISOString(),
    });
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
    const auth = await getAuthContext();
    const body = await request.json();

    const existing = await db.prayerRequest.findUnique({ where: { id } });
    if (!existing || (auth.churchId && existing.churchId !== auth.churchId)) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    // Only the creator or an admin/leader can edit prayer requests
    const isOwner = existing.requestedById === auth.userId;
    const isAdminOrLeader = auth.role === "admin" || auth.role === "leader" || auth.role === "super_admin";
    if (!isOwner && !isAdminOrLeader) {
      return NextResponse.json(
        { error: "You do not have permission to edit this prayer request" },
        { status: 403 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (body.status) updateData.status = body.status;
    if (body.answeredNote !== undefined) updateData.answeredNote = body.answeredNote;
    if (body.requestText) updateData.requestText = body.requestText;

    const updated = await db.prayerRequest.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      answeredNote: updated.answeredNote,
    });
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
    const auth = await getAuthContext();

    const existing = await db.prayerRequest.findUnique({ where: { id } });
    if (!existing || (auth.churchId && existing.churchId !== auth.churchId)) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    // Only the creator or an admin/leader can delete prayer requests
    const isOwner = existing.requestedById === auth.userId;
    const isAdminOrLeader = auth.role === "admin" || auth.role === "leader" || auth.role === "super_admin";
    if (!isOwner && !isAdminOrLeader) {
      return NextResponse.json(
        { error: "You do not have permission to delete this prayer request" },
        { status: 403 }
      );
    }

    await db.prayerRequest.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
