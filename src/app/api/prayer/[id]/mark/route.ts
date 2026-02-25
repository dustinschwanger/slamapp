import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthContext();

    const prayerRequest = await db.prayerRequest.findUnique({
      where: { id },
    });

    if (
      !prayerRequest ||
      (auth.churchId && prayerRequest.churchId !== auth.churchId)
    ) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    // Check if already marked
    const existing = await db.prayerMarking.findUnique({
      where: {
        prayerRequestId_userId: {
          prayerRequestId: id,
          userId: auth.userId,
        },
      },
    });

    if (existing) {
      // Already marked — toggle off (delete)
      await db.prayerMarking.delete({
        where: { id: existing.id },
      });

      const count = await db.prayerMarking.count({
        where: { prayerRequestId: id },
      });

      return NextResponse.json({
        marked: false,
        prayingCount: count,
      });
    }

    // Create marking
    await db.prayerMarking.create({
      data: {
        prayerRequestId: id,
        userId: auth.userId,
      },
    });

    const count = await db.prayerMarking.count({
      where: { prayerRequestId: id },
    });

    return NextResponse.json({
      marked: true,
      prayingCount: count,
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
    const { id } = await params;
    const auth = await getAuthContext();

    await db.prayerMarking.deleteMany({
      where: {
        prayerRequestId: id,
        userId: auth.userId,
      },
    });

    const count = await db.prayerMarking.count({
      where: { prayerRequestId: id },
    });

    return NextResponse.json({
      marked: false,
      prayingCount: count,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
