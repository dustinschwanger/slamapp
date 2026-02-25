import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext, requireRole } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createApplicationSchema = z.object({
  applicantName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  churchName: z.string().optional(),
  experience: z.string().optional(),
  availability: z.string().optional(),
  referencesInfo: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const ctx = await requireRole("admin");

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {
      churchId: ctx.churchId,
    };

    if (status) {
      where.status = status;
    }

    const applications = await db.volunteerApplication.findMany({
      where,
      include: {
        reviewedBy: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = applications.map((app) => ({
      id: app.id,
      applicantName: app.applicantName,
      email: app.email,
      phone: app.phone,
      churchName: app.churchName,
      experience: app.experience,
      availability: app.availability,
      referencesInfo: app.referencesInfo,
      status: app.status,
      notes: app.notes,
      reviewedBy: app.reviewedBy
        ? `${app.reviewedBy.firstName} ${app.reviewedBy.lastName}`
        : null,
      reviewedAt: app.reviewedAt?.toISOString() ?? null,
      createdAt: app.createdAt.toISOString(),
    }));

    return NextResponse.json({ applications: mapped });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const application = await db.volunteerApplication.create({
      data: {
        applicantName: data.applicantName,
        email: data.email,
        phone: data.phone ?? null,
        churchName: data.churchName ?? null,
        experience: data.experience ?? null,
        availability: data.availability ?? null,
        referencesInfo: data.referencesInfo ?? null,
        churchId: ctx.churchId,
      },
    });

    return NextResponse.json(
      {
        id: application.id,
        applicantName: application.applicantName,
        email: application.email,
        status: application.status,
        createdAt: application.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
