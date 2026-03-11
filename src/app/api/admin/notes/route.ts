import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  category: z.enum(["planning", "content", "general", "urgent"]).nullable().optional(),
  isPinned: z.boolean().optional(),
});

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
    const parsed = createNoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const note = await db.adminNote.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category || null,
        isPinned: data.isPinned ?? false,
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
