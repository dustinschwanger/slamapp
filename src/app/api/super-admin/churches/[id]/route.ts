import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;

    const church = await db.church.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
          },
          orderBy: { createdAt: "asc" },
        },
        _count: {
          select: {
            users: true,
            communities: true,
            groups: true,
          },
        },
      },
    });

    if (!church) {
      return NextResponse.json({ error: "Church not found" }, { status: 404 });
    }

    return NextResponse.json({ church });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;

    const existingChurch = await db.church.findUnique({ where: { id } });
    if (!existingChurch) {
      return NextResponse.json({ error: "Church not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, slug, address, city, state, zip, phone, website } = body;

    // Validate slug format if provided
    if (slug !== undefined) {
      if (typeof slug !== "string" || slug.trim().length === 0) {
        return NextResponse.json(
          { error: "Slug cannot be empty" },
          { status: 400 }
        );
      }

      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(slug)) {
        return NextResponse.json(
          {
            error:
              "Slug must be lowercase, alphanumeric with hyphens only (e.g., 'my-church')",
          },
          { status: 400 }
        );
      }

      // Check slug uniqueness (excluding current church)
      if (slug !== existingChurch.slug) {
        const slugTaken = await db.church.findUnique({ where: { slug } });
        if (slugTaken) {
          return NextResponse.json(
            { error: "A church with this slug already exists" },
            { status: 409 }
          );
        }
      }
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (slug !== undefined) updateData.slug = slug.trim();
    if (address !== undefined) updateData.address = address?.trim() || null;
    if (city !== undefined) updateData.city = city?.trim() || null;
    if (state !== undefined) updateData.state = state?.trim() || null;
    if (zip !== undefined) updateData.zip = zip?.trim() || null;
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (website !== undefined) updateData.website = website?.trim() || null;

    const church = await db.church.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ church });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireSuperAdmin();
    const { id } = await params;

    const existingChurch = await db.church.findUnique({ where: { id } });
    if (!existingChurch) {
      return NextResponse.json({ error: "Church not found" }, { status: 404 });
    }

    // Soft delete: set isActive to false
    const church = await db.church.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ church });
  } catch (error) {
    return handleApiError(error);
  }
}
