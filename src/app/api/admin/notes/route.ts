import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET() {
  try {
    const auth = await requireRole("admin");
    const churchId = auth.churchId;

    if (!churchId) {
      return NextResponse.json({ error: "No church assigned" }, { status: 403 });
    }

    const notes = await db.adminNote.findMany({
      where: { churchId },
      include: {
        createdBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(
      notes.map((n) => ({
        id: n.id,
        title: n.title,
        content: n.content,
        category: n.category,
        isPinned: n.isPinned,
        createdByName: n.createdBy
          ? `${n.createdBy.firstName} ${n.createdBy.lastName}`
          : null,
        createdAt: n.createdAt.toISOString(),
        updatedAt: n.updatedAt.toISOString(),
      }))
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole("admin");
    const churchId = auth.churchId;

    if (!churchId) {
      return NextResponse.json({ error: "No church assigned" }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, category, isPinned } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await db.adminNote.create({
      data: {
        title,
        content,
        category: category || null,
        isPinned: isPinned ?? false,
        churchId,
        createdById: auth.userId,
      },
    });

    return NextResponse.json(
      {
        id: note.id,
        title: note.title,
        content: note.content,
        category: note.category,
        isPinned: note.isPinned,
        createdAt: note.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
