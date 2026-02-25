import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await requireRole("admin");

    const note = await db.adminNote.findUnique({
      where: { id },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
      },
    });

    if (!note || (auth.churchId && note.churchId !== auth.churchId)) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: note.id,
      title: note.title,
      content: note.content,
      category: note.category,
      isPinned: note.isPinned,
      createdByName: note.createdBy
        ? `${note.createdBy.firstName} ${note.createdBy.lastName}`
        : null,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
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
    const auth = await requireRole("admin");
    const body = await request.json();

    const existing = await db.adminNote.findUnique({ where: { id } });
    if (!existing || (auth.churchId && existing.churchId !== auth.churchId)) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.isPinned !== undefined) updateData.isPinned = body.isPinned;

    const updated = await db.adminNote.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      content: updated.content,
      category: updated.category,
      isPinned: updated.isPinned,
      updatedAt: updated.updatedAt.toISOString(),
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
    const auth = await requireRole("admin");

    const existing = await db.adminNote.findUnique({ where: { id } });
    if (!existing || (auth.churchId && existing.churchId !== auth.churchId)) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    await db.adminNote.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
