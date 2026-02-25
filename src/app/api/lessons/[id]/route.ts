import { NextRequest, NextResponse } from "next/server";
import { mockLessons } from "@/lib/data/mock-lessons";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthContext();

    // Check mock templates first (global, no church scoping)
    const template = mockLessons.find((l) => l.id === id);
    if (template) {
      return NextResponse.json({ ...template, isTemplate: true });
    }

    // Check DB lessons
    const dbLesson = await db.lesson.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    if (
      !dbLesson ||
      (auth.churchId && dbLesson.churchId && dbLesson.churchId !== auth.churchId)
    ) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    const content = dbLesson.content as Record<string, unknown>;
    return NextResponse.json({
      id: dbLesson.id,
      version: content.version ?? 1,
      title: dbLesson.title,
      subtitle: dbLesson.subtitle ?? "",
      date: dbLesson.scheduledDate?.toISOString().split("T")[0] ?? "",
      scheduledDate: dbLesson.scheduledDate?.toISOString().split("T")[0] ?? "",
      isPublished: dbLesson.isPublished,
      isTemplate: dbLesson.isTemplate,
      author: dbLesson.createdBy
        ? `${dbLesson.createdBy.firstName} ${dbLesson.createdBy.lastName}`
        : "",
      scripture: content.scripture ?? { primary: dbLesson.scriptureReference },
      blocks: content.blocks ?? [],
      discussionQuestions: dbLesson.discussionQuestions,
      notes: content.notes ?? "",
      sourceTemplateId: dbLesson.sourceTemplateId,
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
    const auth = await requireRole("leader");

    // Can only edit DB lessons, not templates
    const existing = await db.lesson.findUnique({ where: { id } });
    if (
      !existing ||
      (auth.churchId && existing.churchId && existing.churchId !== auth.churchId)
    ) {
      return NextResponse.json(
        { error: "Lesson not found in database. Templates cannot be edited directly." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      scriptureReference,
      scriptureVersion,
      blocks,
      discussionQuestions,
      notes,
      scheduledDate,
      isPublished,
    } = body;

    const content = {
      version: 1,
      title: title ?? existing.title,
      subtitle: subtitle ?? existing.subtitle ?? "",
      date: scheduledDate ?? "",
      author: "", // Will be populated from createdBy relation
      scripture: {
        primary: scriptureReference ?? existing.scriptureReference,
      },
      blocks: blocks ?? (existing.content as Record<string, unknown>).blocks ?? [],
      discussionQuestions:
        discussionQuestions ?? existing.discussionQuestions,
      notes: notes ?? "",
    };

    const updated = await db.lesson.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        subtitle: subtitle ?? existing.subtitle,
        scriptureReference: scriptureReference ?? existing.scriptureReference,
        scriptureVersion: scriptureVersion ?? existing.scriptureVersion,
        content,
        discussionQuestions:
          discussionQuestions ?? existing.discussionQuestions,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : existing.scheduledDate,
        isPublished: isPublished ?? existing.isPublished,
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    const updatedContent = updated.content as Record<string, unknown>;
    return NextResponse.json({
      id: updated.id,
      version: updatedContent.version ?? 1,
      title: updated.title,
      subtitle: updated.subtitle ?? "",
      date: updated.scheduledDate?.toISOString().split("T")[0] ?? "",
      scheduledDate: updated.scheduledDate?.toISOString().split("T")[0] ?? "",
      isPublished: updated.isPublished,
      isTemplate: updated.isTemplate,
      author: updated.createdBy
        ? `${updated.createdBy.firstName} ${updated.createdBy.lastName}`
        : "",
      scripture: updatedContent.scripture ?? { primary: updated.scriptureReference },
      blocks: updatedContent.blocks ?? [],
      discussionQuestions: updated.discussionQuestions,
      notes: updatedContent.notes ?? "",
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
    const auth = await requireRole("leader");

    const existing = await db.lesson.findUnique({ where: { id } });
    if (
      !existing ||
      (auth.churchId && existing.churchId && existing.churchId !== auth.churchId)
    ) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    await db.lesson.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
