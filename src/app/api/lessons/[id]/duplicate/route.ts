import { NextRequest, NextResponse } from "next/server";
import { mockLessons } from "@/lib/data/mock-lessons";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";


export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthContext();

    if (!auth.churchId) {
      return NextResponse.json(
        { error: "You must be assigned to a church to create lessons" },
        { status: 403 }
      );
    }

    // Find the source — check mock templates first, then DB
    const template = mockLessons.find((l) => l.id === id);
    let sourceTitle: string;
    let sourceSubtitle: string;
    let sourceScriptureRef: string;
    let sourceScriptureVersion: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sourceContent: any;
    let sourceDiscussionQuestions: string[];
    let sourceTags: string[];

    if (template) {
      sourceTitle = template.title;
      sourceSubtitle = template.subtitle ?? "";
      sourceScriptureRef = template.scripture.primary;
      sourceScriptureVersion = "KJV";
      sourceContent = {
        version: template.version,
        title: template.title,
        subtitle: template.subtitle ?? "",
        date: "",
        author: `${auth.firstName} ${auth.lastName}`,
        scripture: template.scripture,
        blocks: template.blocks,
        discussionQuestions: template.discussionQuestions,
        notes: template.notes ?? "",
      };
      sourceDiscussionQuestions = template.discussionQuestions;
      sourceTags = [];
    } else {
      // Check DB
      const dbLesson = await db.lesson.findUnique({ where: { id } });
      if (
        !dbLesson ||
        (auth.churchId && dbLesson.churchId && dbLesson.churchId !== auth.churchId)
      ) {
        return NextResponse.json(
          { error: "Source lesson not found" },
          { status: 404 }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dbContent = dbLesson.content as any;
      sourceTitle = dbLesson.title;
      sourceSubtitle = dbLesson.subtitle ?? "";
      sourceScriptureRef = dbLesson.scriptureReference;
      sourceScriptureVersion = dbLesson.scriptureVersion;
      sourceContent = {
        ...dbContent,
        date: "",
        author: `${auth.firstName} ${auth.lastName}`,
      };
      sourceDiscussionQuestions = dbLesson.discussionQuestions;
      sourceTags = dbLesson.tags;
    }

    const created = await db.lesson.create({
      data: {
        title: sourceTitle,
        subtitle: sourceSubtitle,
        scriptureReference: sourceScriptureRef,
        scriptureVersion: sourceScriptureVersion,
        content: sourceContent,
        discussionQuestions: sourceDiscussionQuestions,
        tags: sourceTags,
        createdById: auth.userId,
        churchId: auth.churchId,
        isTemplate: false,
        sourceTemplateId: template ? null : id, // Only set for DB sources
        isPublished: false,
      },
      include: {
        createdBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createdContent = created.content as any;
    return NextResponse.json(
      {
        id: created.id,
        version: createdContent.version ?? 1,
        title: created.title,
        subtitle: created.subtitle ?? "",
        date: created.scheduledDate?.toISOString().split("T")[0] ?? "",
        scheduledDate: created.scheduledDate?.toISOString().split("T")[0] ?? "",
        isPublished: created.isPublished,
        isTemplate: false,
        author: created.createdBy
          ? `${created.createdBy.firstName} ${created.createdBy.lastName}`
          : "",
        scripture: createdContent.scripture ?? { primary: created.scriptureReference },
        blocks: createdContent.blocks ?? [],
        discussionQuestions: created.discussionQuestions,
        notes: createdContent.notes ?? "",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
