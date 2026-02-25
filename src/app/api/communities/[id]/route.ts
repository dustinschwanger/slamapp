import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const updateCommunitySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  city: z.string().min(1, "City is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  zip: z.string().min(1, "ZIP code is required").optional(),
  contactName: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

async function getCommunityForChurch(id: string, churchId: string) {
  const community = await db.community.findUnique({
    where: { id },
    include: {
      rooms: {
        orderBy: { name: "asc" },
      },
      _count: {
        select: { groups: true },
      },
    },
  });

  if (!community) {
    throw new AuthError("Community not found", 404);
  }

  if (community.churchId !== churchId) {
    throw new AuthError("Community not found", 404);
  }

  return community;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const community = await getCommunityForChurch(id, ctx.churchId);

    return NextResponse.json(community);
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
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate ownership
    await getCommunityForChurch(id, ctx.churchId);

    const body = await request.json();
    const parsed = updateCommunitySchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await db.community.update({
      where: { id },
      data,
      include: {
        rooms: {
          orderBy: { name: "asc" },
        },
        _count: {
          select: { groups: true },
        },
      },
    });

    return NextResponse.json(updated);
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
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate ownership
    await getCommunityForChurch(id, ctx.churchId);

    // Soft delete
    await db.community.update({
      where: { id },
      data: { isActive: false },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
