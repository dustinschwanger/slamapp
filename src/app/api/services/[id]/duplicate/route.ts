import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

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

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await requireRole("leader");

    const original = await db.servicePlan.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!original) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    // Validate church ownership
    if (auth.churchId && original.churchId !== auth.churchId) {
      return NextResponse.json(
        { error: "Service plan not found" },
        { status: 404 }
      );
    }

    const plan = await db.$transaction(async (tx) => {
      const created = await tx.servicePlan.create({
        data: {
          name: `${original.name} (Copy)`,
          description: original.description,
          serviceDate: null,
          communityId: original.communityId,
          roomId: original.roomId,
          groupId: original.groupId,
          createdById: auth.userId,
          churchId: original.churchId,
          isTemplate: original.isTemplate,
          postServiceNotes: null,
          status: "draft",
        },
      });

      if (original.items.length > 0) {
        await tx.servicePlanItem.createMany({
          data: original.items.map((item) => ({
            servicePlanId: created.id,
            position: item.position,
            type: item.type,
            title: item.title,
            notes: item.notes,
            estimatedDurationSeconds: item.estimatedDurationSeconds,
            itemData: item.itemData ?? {},
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
