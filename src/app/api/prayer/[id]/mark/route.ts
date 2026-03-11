import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
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

    // Toggle prayer marking atomically: try delete first, then create if nothing was deleted.
    // This avoids the TOCTOU race condition of check-then-act.
    const deleted = await db.prayerMarking.deleteMany({
      where: { prayerRequestId: id, userId: auth.userId },
    });

    let marked: boolean;

    if (deleted.count === 0) {
      // Not currently marked — create a new marking
      try {
        await db.prayerMarking.create({
          data: {
            prayerRequestId: id,
            userId: auth.userId,
          },
        });
        marked = true;
      } catch (e: unknown) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          // Race condition: another request already created the marking
          marked = true;
        } else {
          throw e;
        }
      }
    } else {
      marked = false;
    }

    const count = await db.prayerMarking.count({
      where: { prayerRequestId: id },
    });

    return NextResponse.json({ marked, prayingCount: count });
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
