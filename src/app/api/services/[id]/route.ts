import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";
import { servicePlanItemSchema } from "@/lib/validations";

const updateServicePlanSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).nullable().optional(),
  serviceDate: z.string().nullable().optional(),
  communityId: z.string().uuid().nullable().optional(),
  roomId: z.string().uuid().nullable().optional(),
  groupId: z.string().uuid().nullable().optional(),
  isTemplate: z.boolean().optional(),
  postServiceNotes: z.string().max(5000).nullable().optional(),
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
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthContext();

    const plan = await db.servicePlan.findUnique({
      where: { id },
      include: planInclude,
    });

    if (!plan) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    // Validate church ownership
    if (auth.churchId && plan.churchId !== auth.churchId) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(plan);
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
    const body = await request.json();

    const parsed = updateServicePlanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await db.servicePlan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    // Validate church ownership
    if (auth.churchId && existing.churchId !== auth.churchId) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    // Whitelist allowed fields to prevent mass assignment
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.serviceDate !== undefined) updateData.serviceDate = data.serviceDate ? new Date(data.serviceDate) : null;
    if (data.communityId !== undefined) updateData.communityId = data.communityId;
    if (data.roomId !== undefined) updateData.roomId = data.roomId;
    if (data.groupId !== undefined) updateData.groupId = data.groupId;
    if (data.isTemplate !== undefined) updateData.isTemplate = data.isTemplate;
    if (data.postServiceNotes !== undefined) updateData.postServiceNotes = data.postServiceNotes;
    if (data.status !== undefined) updateData.status = data.status;

    const plan = await db.$transaction(async (tx) => {
      await tx.servicePlan.update({
        where: { id },
        data: updateData,
      });

      if (data.items !== undefined) {
        await tx.servicePlanItem.deleteMany({
          where: { servicePlanId: id },
        });

        if (data.items.length > 0) {
          await tx.servicePlanItem.createMany({
            data: data.items.map((item, index) => ({
              servicePlanId: id,
              position: item.position ?? index,
              type: item.type,
              title: item.title,
              notes: item.notes ?? null,
              estimatedDurationSeconds: item.estimatedDurationSeconds ?? 180,
              itemData: (item.itemData ?? {}) as object,
            })),
          });
        }
      }

      return tx.servicePlan.findUnique({
        where: { id },
        include: planInclude,
      });
    });

    return NextResponse.json(plan);
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

    const existing = await db.servicePlan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    // Validate church ownership
    if (auth.churchId && existing.churchId !== auth.churchId) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    await db.servicePlan.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
