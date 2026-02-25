import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError } from "@/lib/auth/api-utils";

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.churchId) {
      return NextResponse.json({ requests: [] });
    }

    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const myPrayers = searchParams.get("myPrayers") === "true";
    const communityId = searchParams.get("communityId");

    const where: Record<string, unknown> = {
      churchId: auth.churchId,
    };

    if (status) {
      where.status = status;
    }

    if (myPrayers) {
      where.markings = {
        some: { userId: auth.userId },
      };
    }

    // Filter by community (prayer requests are linked via room → community)
    if (communityId) {
      where.room = {
        communityId: communityId,
      };
    }

    const requests = await db.prayerRequest.findMany({
      where,
      include: {
        markings: {
          select: { userId: true },
        },
        room: {
          select: {
            id: true,
            name: true,
            community: {
              select: { id: true, name: true },
            },
          },
        },
        requestedBy: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Map to frontend shape
    const mapped = requests.map((r) => ({
      id: r.id,
      requesterName: r.requesterName,
      requestText: r.requestText,
      communityId: r.room?.community?.id ?? "",
      communityName: r.room?.community?.name ?? "",
      room: r.room?.name ?? undefined,
      status: r.status as "active" | "answered" | "urgent",
      isAnonymous: r.isAnonymous,
      prayingCount: r.markings.length,
      prayingUserIds: r.markings.map((m) => m.userId),
      createdAt: r.createdAt.toISOString(),
      answeredAt: r.answeredNote ? r.updatedAt.toISOString() : undefined,
    }));

    return NextResponse.json({ requests: mapped });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.churchId) {
      return NextResponse.json(
        { error: "You must be assigned to a church" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { requesterName, requestText, communityId, isAnonymous, isUrgent } =
      body;

    if (!requestText || requestText.length < 10) {
      return NextResponse.json(
        { error: "Prayer request text is required (min 10 characters)" },
        { status: 400 }
      );
    }

    // Look up the community to get a room if needed
    let roomId: string | null = null;
    if (communityId) {
      const community = await db.community.findUnique({
        where: { id: communityId },
        select: { churchId: true },
      });
      if (!community || community.churchId !== auth.churchId) {
        return NextResponse.json(
          { error: "Community not found" },
          { status: 404 }
        );
      }
    }

    const created = await db.prayerRequest.create({
      data: {
        requesterName: isAnonymous
          ? "Anonymous"
          : requesterName || auth.firstName,
        requestText,
        roomId,
        status: isUrgent ? "urgent" : "active",
        isAnonymous: isAnonymous ?? false,
        requestedById: auth.userId,
        churchId: auth.churchId,
      },
      include: {
        markings: { select: { userId: true } },
        room: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(
      {
        id: created.id,
        requesterName: created.requesterName,
        requestText: created.requestText,
        communityId: "",
        communityName: "",
        room: created.room?.name ?? undefined,
        status: created.status,
        isAnonymous: created.isAnonymous,
        prayingCount: 0,
        prayingUserIds: [],
        createdAt: created.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
