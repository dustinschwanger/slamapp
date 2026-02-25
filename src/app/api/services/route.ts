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

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const isTemplate = searchParams.get("isTemplate");
    const upcoming = searchParams.get("upcoming");

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
    const { items } = body;

    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!auth.churchId) {
      return NextResponse.json(
        { error: "You must be assigned to a church" },
        { status: 403 }
      );
    }

    // Whitelist allowed fields to prevent mass assignment
    const planData = {
      name: body.name as string,
      churchId: auth.churchId,
      createdById: auth.userId,
      description: (body.description as string | undefined) ?? null,
      serviceDate: body.serviceDate ? new Date(body.serviceDate) : null,
      communityId: (body.communityId as string | undefined) ?? null,
      roomId: (body.roomId as string | undefined) ?? null,
      groupId: (body.groupId as string | undefined) ?? null,
      isTemplate: (body.isTemplate as boolean | undefined) ?? false,
      status: (body.status as string | undefined) ?? "draft",
    };

    const plan = await db.$transaction(async (tx) => {
      const created = await tx.servicePlan.create({
        data: planData,
      });

      if (items && Array.isArray(items) && items.length > 0) {
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
              servicePlanId: created.id,
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
