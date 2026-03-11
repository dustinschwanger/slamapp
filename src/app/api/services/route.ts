import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";
import { servicePlanItemSchema } from "@/lib/validations";

const createServicePlanSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().max(2000).nullable().optional(),
  serviceDate: z.string().nullable().optional(),
  communityId: z.string().uuid().nullable().optional(),
  roomId: z.string().uuid().nullable().optional(),
  groupId: z.string().uuid().nullable().optional(),
  isTemplate: z.boolean().optional(),
  status: z.enum(["draft", "ready", "completed"]).optional(),
  items: z.array(servicePlanItemSchema).max(100).optional(),
});

const planInclude = {
  items: {
    orderBy: { position: "asc" as const },
  },
  community: {
    select: { id: true, name: true },
  },
  room: {
    select: { id: true, name: true },
  },
  group: {
    select: { id: true, name: true },
  },
  createdBy: {
    select: { id: true, firstName: true, lastName: true },
  },
  _count: {
    select: { items: true },
  },
};

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const isTemplate = searchParams.get("isTemplate");
    const upcoming = searchParams.get("upcoming");
    const studyPlanId = searchParams.get("studyPlanId");

    const where: Record<string, unknown> = {};

    // Scope to church
    if (auth.churchId) {
      where.churchId = auth.churchId;
    }

    if (status) {
      where.status = status;
    }

    if (isTemplate === "true") {
      where.isTemplate = true;
    } else if (isTemplate === "false") {
      where.isTemplate = false;
    }

    if (upcoming === "true") {
      where.serviceDate = { gte: new Date() };
    }

    if (studyPlanId) {
      where.studyPlanId = studyPlanId;
    }

    const plans = await db.servicePlan.findMany({
      where,
      include: planInclude,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(plans);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole("leader");
    const body = await request.json();

    const parsed = createServicePlanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!auth.churchId) {
      return NextResponse.json(
        { error: "You must be assigned to a church" },
        { status: 403 }
      );
    }

    const planData = {
      name: data.name,
      churchId: auth.churchId,
      createdById: auth.userId,
      description: data.description ?? null,
      serviceDate: data.serviceDate ? new Date(data.serviceDate) : null,
      communityId: data.communityId ?? null,
      roomId: data.roomId ?? null,
      groupId: data.groupId ?? null,
      isTemplate: data.isTemplate ?? false,
      status: data.status ?? "draft",
    };

    const plan = await db.$transaction(async (tx) => {
      const created = await tx.servicePlan.create({
        data: planData,
      });

      if (data.items && data.items.length > 0) {
        await tx.servicePlanItem.createMany({
          data: data.items.map((item, index) => ({
            servicePlanId: created.id,
            position: item.position ?? index,
            type: item.type,
            title: item.title,
            notes: item.notes ?? null,
            estimatedDurationSeconds: item.estimatedDurationSeconds ?? 180,
            itemData: (item.itemData ?? {}) as object,
          })),
        });
      }

      return tx.servicePlan.findUnique({
        where: { id: created.id },
        include: planInclude,
      });
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
