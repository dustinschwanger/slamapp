import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const updateApplicationSchema = z.object({
  status: z.enum(["approved", "declined"]),
  notes: z.string().optional(),
});

async function getApplicationForChurch(id: string, churchId: string) {
  const application = await db.volunteerApplication.findUnique({
    where: { id },
    include: {
      reviewedBy: {
        select: { firstName: true, lastName: true },
      },
    },
  });

  if (!application) {
    throw new AuthError("Application not found", 404);
  }

  if (application.churchId !== churchId) {
    throw new AuthError("Application not found", 404);
  }

  return application;
}

export async function GET(
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

    const application = await getApplicationForChurch(id, ctx.churchId);

    return NextResponse.json({
      id: application.id,
      applicantName: application.applicantName,
      email: application.email,
      phone: application.phone,
      churchName: application.churchName,
      experience: application.experience,
      availability: application.availability,
      referencesInfo: application.referencesInfo,
      status: application.status,
      notes: application.notes,
      reviewedBy: application.reviewedBy
        ? `${application.reviewedBy.firstName} ${application.reviewedBy.lastName}`
        : null,
      reviewedAt: application.reviewedAt?.toISOString() ?? null,
      createdAt: application.createdAt.toISOString(),
    });
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
    await getApplicationForChurch(id, ctx.churchId);

    const body = await request.json();
    const parsed = updateApplicationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await db.volunteerApplication.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes ?? null,
        reviewedById: ctx.userId,
        reviewedAt: new Date(),
      },
      include: {
        reviewedBy: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return NextResponse.json({
      id: updated.id,
      applicantName: updated.applicantName,
      email: updated.email,
      status: updated.status,
      notes: updated.notes,
      reviewedBy: updated.reviewedBy
        ? `${updated.reviewedBy.firstName} ${updated.reviewedBy.lastName}`
        : null,
      reviewedAt: updated.reviewedAt?.toISOString() ?? null,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
