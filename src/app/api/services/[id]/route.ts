import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
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
    const { items } = body;

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
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.serviceDate !== undefined) updateData.serviceDate = body.serviceDate ? new Date(body.serviceDate) : null;
    if (body.communityId !== undefined) updateData.communityId = body.communityId;
    if (body.roomId !== undefined) updateData.roomId = body.roomId;
    if (body.groupId !== undefined) updateData.groupId = body.groupId;
    if (body.isTemplate !== undefined) updateData.isTemplate = body.isTemplate;
    if (body.postServiceNotes !== undefined) updateData.postServiceNotes = body.postServiceNotes;
    if (body.status !== undefined) updateData.status = body.status;

    const plan = await db.$transaction(async (tx) => {
      await tx.servicePlan.update({
        where: { id },
        data: updateData,
      });

      if (items && Array.isArray(items)) {
        await tx.servicePlanItem.deleteMany({
          where: { servicePlanId: id },
        });

        if (items.length > 0) {
          await tx.servicePlanItem.createMany({
            data: items.map(
              (
                item: {
                  type: string;
                  title: string;
                  position: number;
                  notes?: string;
                  estimatedDurationSeconds?: number;
                  itemData?: unknown;
                },
                index: number
              ) => ({
                servicePlanId: id,
                position: item.position ?? index,
                type: item.type,
                title: item.title,
                notes: item.notes ?? null,
                estimatedDurationSeconds: item.estimatedDurationSeconds ?? 180,
                itemData: item.itemData ?? {},
              })
            ),
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
