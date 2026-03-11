import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createCommunitySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  address: z.string().min(1, "Address is required").max(500),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(2, "State is required").max(2, "State must be a 2-letter code"),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "ZIP code must be in format 12345 or 12345-6789"),
  contactName: z.string().max(200).optional(),
  contactPhone: z.string().max(20).optional(),
  notes: z.string().max(2000).optional(),
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
