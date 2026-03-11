import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { servicePlanItemsArraySchema } from "@/lib/validations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await requireRole("leader");
    const body = await request.json();
    const { items } = body;

    const parsed = servicePlanItemsArraySchema.safeParse(items);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const plan = await db.servicePlan.findUnique({
      where: { id },
      select: { id: true, name: true, churchId: true },
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

    // Get current max position
    const maxResult = await db.servicePlanItem.aggregate({
      where: { servicePlanId: id },
      _max: { position: true },
    });
    const startPosition = (maxResult._max.position ?? -1) + 1;

    const validatedItems = parsed.data;

    await db.servicePlanItem.createMany({
      data: validatedItems.map((item, index) => ({
        servicePlanId: id,
        position: startPosition + index,
        type: item.type,
        title: item.title,
        notes: item.notes ?? null,
        estimatedDurationSeconds: item.estimatedDurationSeconds ?? 180,
        itemData: (item.itemData ?? {}) as object,
      })),
    });

    return NextResponse.json({
      added: validatedItems.length,
      planId: plan.id,
      planName: plan.name,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
