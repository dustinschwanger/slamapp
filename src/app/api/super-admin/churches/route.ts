import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET() {
  try {
    await requireSuperAdmin();

    const churches = await db.church.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    return NextResponse.json({ churches });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await request.json();
    const { name, slug, address, city, state, zip, phone, website } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Church name is required" },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // Validate slug format: lowercase, alphanumeric, hyphens only
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

    // Check slug uniqueness
    const existingChurch = await db.church.findUnique({
      where: { slug },
    });

    if (existingChurch) {
      return NextResponse.json(
        { error: "A church with this slug already exists" },
        { status: 409 }
      );
    }

    const church = await db.church.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        address: address?.trim() || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
        zip: zip?.trim() || null,
        phone: phone?.trim() || null,
        website: website?.trim() || null,
      },
    });

    return NextResponse.json({ church }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
