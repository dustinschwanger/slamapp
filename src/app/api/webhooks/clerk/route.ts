import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

type WebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
    phone_numbers: { phone_number: string }[];
    image_url: string | null;
  };
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  const { type, data } = event;

  if (type === "user.created") {
    const email = data.email_addresses[0]?.email_address ?? "";
    const phone = data.phone_numbers[0]?.phone_number ?? null;

    // Check if this user was pre-invited (has a pending_ clerkId)
    const preInvited = await db.user.findUnique({ where: { email } });

    if (preInvited && preInvited.clerkId.startsWith("pending_")) {
      // Link the pre-invited record to the real Clerk account.
      // Preserve churchId and role that were set during invitation.
      await db.user.update({
        where: { id: preInvited.id },
        data: {
          clerkId: data.id,
          firstName: data.first_name ?? preInvited.firstName,
          lastName: data.last_name ?? preInvited.lastName,
          phone,
          avatarUrl: data.image_url,
        },
      });
    } else {
      // New users get churchId: null, role: "member"
      // Super admin assigns church via super-admin UI
      await db.user.upsert({
        where: { clerkId: data.id },
        create: {
          clerkId: data.id,
          email,
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          phone,
          avatarUrl: data.image_url,
          role: "member",
          churchId: null,
        },
        update: {
          email,
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          phone,
          avatarUrl: data.image_url,
        },
      });
    }
  }

  if (type === "user.updated") {
    const email = data.email_addresses[0]?.email_address ?? "";
    const phone = data.phone_numbers[0]?.phone_number ?? null;

    // On user.updated, only sync profile fields — do NOT touch churchId or role
    await db.user.updateMany({
      where: { clerkId: data.id },
      data: {
        email,
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        phone,
        avatarUrl: data.image_url,
      },
    });
  }

  return NextResponse.json({ received: true });
}
