import { NextRequest, NextResponse } from "next/server";
import { mockLessons } from "@/lib/data/mock-lessons";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const tab = searchParams.get("tab");
    const search = searchParams.get("search")?.toLowerCase();

    if (tab === "my-lessons") {
      // My Lessons come from the database
      const auth = await getAuthContext();
      if (!auth.churchId) {
        return NextResponse.json({ lessons: [] });
      }

      const dbLessons = await db.lesson.findMany({
        where: {
          churchId: auth.churchId,
          isTemplate: false,
        },
        include: {
          createdBy: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      });

      const lessons = dbLessons.map((l) => ({
        id: l.id,
        version: (l.content as Record<string, unknown>).version ?? 1,
        title: l.title,
        subtitle: l.subtitle ?? "",
        date: l.scheduledDate?.toISOString().split("T")[0] ?? "",
        scheduledDate: l.scheduledDate?.toISOString().split("T")[0] ?? "",
        isPublished: l.isPublished,
        isTemplate: false,
        author: l.createdBy
          ? `${l.createdBy.firstName} ${l.createdBy.lastName}`
          : "",
        scripture: (l.content as Record<string, unknown>).scripture ?? {
          primary: l.scriptureReference,
        },
        blocks: (l.content as Record<string, unknown>).blocks ?? [],
        discussionQuestions: l.discussionQuestions,
        notes: (l.content as Record<string, unknown>).notes ?? "",
        sourceTemplateId: l.sourceTemplateId,
      }));

      return NextResponse.json({ lessons });
    }

    // Templates tab (default) — return mock lessons as templates
    let lessons = mockLessons.map((l) => ({
      ...l,
      isTemplate: true,
    }));

    if (search) {
      lessons = lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(search) ||
          (l.subtitle?.toLowerCase().includes(search) ?? false) ||
          l.scripture.primary.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ lessons });
  } catch (error) {
    return handleApiError(error);
  }
}
