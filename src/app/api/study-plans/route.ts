import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { mockLessons } from "@/lib/data/mock-lessons";
import { getMetadataById } from "@/lib/data/lesson-metadata";
import { BLOCK_TYPE_LABELS, BLOCK_DURATIONS } from "@/lib/constants/lessons";
import type { LessonBlockType } from "@/lib/types";

/**
 * GET /api/study-plans
 * Lists study plans by grouping services that share a studyPlanId.
 */
export async function GET() {
  try {
    const auth = await getAuthContext();

    const where: Record<string, unknown> = {
      studyPlanId: { not: null },
    };
    if (auth.churchId) {
      where.churchId = auth.churchId;
    }

    const services = await db.servicePlan.findMany({
      where,
      select: {
        id: true,
        studyPlanId: true,
        studyPlanName: true,
        studyPlanWeek: true,
        status: true,
        createdAt: true,
      },
      orderBy: { studyPlanWeek: "asc" },
    });

    // Group by studyPlanId
    const planMap = new Map<
      string,
      {
        studyPlanId: string;
        name: string;
        book: string;
        weekCount: number;
        createdAt: string;
        progress: { draft: number; ready: number; completed: number };
      }
    >();

    for (const svc of services) {
      if (!svc.studyPlanId) continue;

      if (!planMap.has(svc.studyPlanId)) {
        // Extract book from plan name: "Matthew - 6 Week Study" -> "Matthew"
        const name = svc.studyPlanName ?? "Study Plan";
        const bookMatch = name.match(/^([A-Za-z0-9\s]+?)\s*-/);
        const book = bookMatch ? bookMatch[1].trim() : "";

        planMap.set(svc.studyPlanId, {
          studyPlanId: svc.studyPlanId,
          name,
          book,
          weekCount: 0,
          createdAt: svc.createdAt.toISOString(),
          progress: { draft: 0, ready: 0, completed: 0 },
        });
      }

      const plan = planMap.get(svc.studyPlanId)!;
      plan.weekCount++;

      if (svc.status === "completed") {
        plan.progress.completed++;
      } else if (svc.status === "ready") {
        plan.progress.ready++;
      } else {
        plan.progress.draft++;
      }
    }

    const plans = Array.from(planMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(plans);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/study-plans
 * Creates all N services in a single transaction for a study plan.
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole("leader");
    const body = await request.json();
    const { name, book, lessonIds, startDate } = body as {
      name: string;
      book: string;
      lessonIds: string[];
      startDate?: string;
    };

    if (!name || !lessonIds?.length) {
      return NextResponse.json(
        { error: "name and lessonIds are required" },
        { status: 400 }
      );
    }

    if (!auth.churchId) {
      return NextResponse.json(
        { error: "You must be assigned to a church" },
        { status: 403 }
      );
    }

    const studyPlanId = crypto.randomUUID();

    // Sort lessonIds by book order then lesson number for chronological order
    const bookOrder: string[] = [];
    for (const id of lessonIds) {
      const m = getMetadataById(id);
      if (m && !bookOrder.includes(m.book)) bookOrder.push(m.book);
    }
    const sortedLessonIds = [...lessonIds].sort((a, b) => {
      const metaA = getMetadataById(a);
      const metaB = getMetadataById(b);
      const bookA = bookOrder.indexOf(metaA?.book ?? "");
      const bookB = bookOrder.indexOf(metaB?.book ?? "");
      if (bookA !== bookB) return bookA - bookB;
      return (metaA?.lessonNumber ?? 0) - (metaB?.lessonNumber ?? 0);
    });

    const result = await db.$transaction(async (tx) => {
      const servicePlanIds: string[] = [];

      for (let i = 0; i < sortedLessonIds.length; i++) {
        const lessonId = sortedLessonIds[i];
        const lesson = mockLessons.find((l) => l.id === lessonId);
        const meta = getMetadataById(lessonId);

        const lessonTitle = lesson?.title ?? `Lesson ${meta?.lessonNumber ?? i + 1}`;
        const serviceName = `${name} - Week ${i + 1}: ${lessonTitle}`;

        let serviceDate: Date | null = null;
        if (startDate) {
          const base = new Date(startDate + "T00:00:00");
          base.setDate(base.getDate() + i * 7);
          serviceDate = base;
        }

        const plan = await tx.servicePlan.create({
          data: {
            name: serviceName,
            description: lesson?.scripture.primary
              ? `${lesson.scripture.primary} - ${lesson.subtitle ?? ""}`
              : undefined,
            serviceDate,
            status: "draft",
            studyPlanId,
            studyPlanName: name,
            studyPlanWeek: i + 1,
            churchId: auth.churchId!,
            createdById: auth.userId,
          },
        });

        // Create ServicePlanItems from lesson blocks
        if (lesson?.blocks && lesson.blocks.length > 0) {
          await tx.servicePlanItem.createMany({
            data: lesson.blocks.map((block, blockIndex) => {
              const blockType = block.type as LessonBlockType;
              return {
                servicePlanId: plan.id,
                position: blockIndex,
                type: "lesson_block",
                title: `${BLOCK_TYPE_LABELS[blockType] ?? block.type}: ${lessonTitle}`,
                estimatedDurationSeconds: BLOCK_DURATIONS[blockType] ?? 180,
                itemData: {
                  lessonId,
                  blockIndex,
                },
              };
            }),
          });
        }

        servicePlanIds.push(plan.id);
      }

      return { studyPlanId, servicePlanIds };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/study-plans?studyPlanId=xxx
 * Deletes all services in a study plan.
 */
export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireRole("leader");
    const { searchParams } = request.nextUrl;
    const studyPlanId = searchParams.get("studyPlanId");

    if (!studyPlanId) {
      return NextResponse.json(
        { error: "studyPlanId query parameter is required" },
        { status: 400 }
      );
    }

    const where: Record<string, unknown> = { studyPlanId };
    if (auth.churchId) {
      where.churchId = auth.churchId;
    }

    // First delete all items, then all service plans in the group
    await db.$transaction(async (tx) => {
      const plans = await tx.servicePlan.findMany({
        where,
        select: { id: true },
      });

      const planIds = plans.map((p) => p.id);

      if (planIds.length > 0) {
        await tx.servicePlanItem.deleteMany({
          where: { servicePlanId: { in: planIds } },
        });
        await tx.servicePlan.deleteMany({ where: { id: { in: planIds } } });
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
