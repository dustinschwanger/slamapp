import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: shiftId } = await params;
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate shift exists and belongs to church
    const shift = await db.volunteerShift.findUnique({
      where: { id: shiftId },
      include: {
        signups: { select: { userId: true } },
      },
    });

    if (!shift || shift.churchId !== ctx.churchId) {
      throw new AuthError("Shift not found", 404);
    }

    // Check if already signed up
    const existingSignup = shift.signups.find((s) => s.userId === ctx.userId);
    if (existingSignup) {
      return NextResponse.json(
        { error: "You are already signed up for this shift" },
        { status: 409 }
      );
    }

    // Check if shift is full
    if (shift.signups.length >= shift.maxVolunteers) {
      return NextResponse.json(
        { error: "This shift is full" },
        { status: 409 }
      );
    }

    await db.shiftSignup.create({
      data: {
        shiftId,
        userId: ctx.userId,
        status: "confirmed",
      },
    });

    // Return updated signup count
    const updatedShift = await db.volunteerShift.findUnique({
      where: { id: shiftId },
      include: {
        signups: {
          select: {
            userId: true,
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
    });

    return NextResponse.json({
      signedUp: true,
      signedUpCount: updatedShift?.signups.length ?? 0,
      signedUpIds: updatedShift?.signups.map((s) => s.userId) ?? [],
      signedUpNames:
        updatedShift?.signups.map(
          (s) => `${s.user.firstName} ${s.user.lastName}`
        ) ?? [],
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: shiftId } = await params;
    const ctx = await getAuthContext();

    if (!ctx.churchId) {
      return NextResponse.json(
        { error: "You are not assigned to a church" },
        { status: 403 }
      );
    }

    // Validate shift exists and belongs to church
    const shift = await db.volunteerShift.findUnique({
      where: { id: shiftId },
      select: { churchId: true },
    });

    if (!shift || shift.churchId !== ctx.churchId) {
      throw new AuthError("Shift not found", 404);
    }

    // Find and delete the signup
    const signup = await db.shiftSignup.findUnique({
      where: {
        shiftId_userId: {
          shiftId,
          userId: ctx.userId,
        },
      },
    });

    if (!signup) {
      return NextResponse.json(
        { error: "You are not signed up for this shift" },
        { status: 404 }
      );
    }

    await db.shiftSignup.delete({
      where: { id: signup.id },
    });

    // Return updated signup count
    const updatedShift = await db.volunteerShift.findUnique({
      where: { id: shiftId },
      include: {
        signups: {
          select: {
            userId: true,
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
    });

    return NextResponse.json({
      signedUp: false,
      signedUpCount: updatedShift?.signups.length ?? 0,
      signedUpIds: updatedShift?.signups.map((s) => s.userId) ?? [],
      signedUpNames:
        updatedShift?.signups.map(
          (s) => `${s.user.firstName} ${s.user.lastName}`
        ) ?? [],
    });
  } catch (error) {
    return handleApiError(error);
  }
}
