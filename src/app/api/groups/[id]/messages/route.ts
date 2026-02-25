import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthContext } from "@/lib/auth/context";
import { handleApiError, AuthError } from "@/lib/auth/api-utils";
import { z } from "zod";

const createMessageSchema = z.object({
  content: z.string().min(1, "Message content is required"),
  messageType: z.enum(["text", "prayer_share", "system"]).optional().default("text"),
});

async function validateGroupOwnership(groupId: string, churchId: string) {
  const group = await db.group.findUnique({
    where: { id: groupId },
  });

  if (!group || !group.isActive) {
    throw new AuthError("Group not found", 404);
  }

  if (group.churchId !== churchId) {
    throw new AuthError("Group not found", 404);
  }

  return group;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export async function GET(
  request: NextRequest,
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

    await validateGroupOwnership(id, ctx.churchId);

    // Verify user is a member of this group (or is admin/super_admin)
    if (ctx.role !== "admin" && ctx.role !== "super_admin") {
      const membership = await db.groupMember.findUnique({
        where: { groupId_userId: { groupId: id, userId: ctx.userId } },
      });
      if (!membership) {
        return NextResponse.json(
          { error: "You are not a member of this group" },
          { status: 403 }
        );
      }
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 100);
    const cursor = searchParams.get("cursor");

    const where: {
      groupId: string;
      churchId: string;
      createdAt?: { lt: Date };
    } = {
      groupId: id,
      churchId: ctx.churchId,
    };

    if (cursor) {
      where.createdAt = { lt: new Date(cursor) };
    }

    const messages = await db.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    // Reverse so messages are in chronological order for display
    const chronological = messages.reverse();

    const mapped = chronological.map((msg) => ({
      id: msg.id,
      groupId: msg.groupId,
      senderId: msg.senderId ?? "",
      senderName: msg.sender
        ? `${msg.sender.firstName} ${msg.sender.lastName}`
        : "System",
      senderInitials: msg.sender
        ? getInitials(msg.sender.firstName, msg.sender.lastName)
        : "SY",
      content: msg.content,
      timestamp: msg.createdAt.toISOString(),
      type: msg.messageType as "text" | "prayer_share" | "system",
    }));

    // Return cursor for pagination (oldest message timestamp)
    const nextCursor =
      messages.length === limit
        ? messages[0].createdAt.toISOString()
        : null;

    return NextResponse.json({ messages: mapped, nextCursor });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest,
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

    await validateGroupOwnership(id, ctx.churchId);

    // Verify user is a member of this group (or is admin/super_admin)
    if (ctx.role !== "admin" && ctx.role !== "super_admin") {
      const membership = await db.groupMember.findUnique({
        where: { groupId_userId: { groupId: id, userId: ctx.userId } },
      });
      if (!membership) {
        return NextResponse.json(
          { error: "You must be a member of this group to send messages" },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const parsed = createMessageSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const { content, messageType } = parsed.data;

    const message = await db.message.create({
      data: {
        groupId: id,
        senderId: ctx.userId,
        content,
        messageType,
        churchId: ctx.churchId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const mapped = {
      id: message.id,
      groupId: message.groupId,
      senderId: message.senderId ?? "",
      senderName: message.sender
        ? `${message.sender.firstName} ${message.sender.lastName}`
        : "System",
      senderInitials: message.sender
        ? getInitials(message.sender.firstName, message.sender.lastName)
        : "SY",
      content: message.content,
      timestamp: message.createdAt.toISOString(),
      type: message.messageType as "text" | "prayer_share" | "system",
    };

    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
