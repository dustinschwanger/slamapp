import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createCommunitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const communities = await db.community.findMany({
      where: {
        churchId: ctx.churchId,
        isActive: true,
      },
      include: {
        rooms: true,
        _count: {
          select: { groups: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(communities);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createCommunitySchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const community = await db.community.create({
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        contactName: data.contactName ?? null,
        contactPhone: data.contactPhone ?? null,
        notes: data.notes ?? null,
        churchId: ctx.churchId,
      },
      include: {
        rooms: true,
        _count: {
          select: { groups: true },
        },
      },
    });

    return NextResponse.json(community, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
