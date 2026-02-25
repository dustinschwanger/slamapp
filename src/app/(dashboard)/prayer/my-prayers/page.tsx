"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrayerRequestCard } from "@/components/prayer/PrayerRequestCard";
import type { PrayerRequest } from "@/lib/types";

export default function MyPrayersPage() {
  const currentUserId = "current-user";
  const allRequests: PrayerRequest[] = [];
  const myPrayers = allRequests.filter((r) =>
    r.prayingUserIds.includes(currentUserId)
  );

  return (
    <div className="max-w-3xl">
      {/* Back button */}
      <Link href="/prayer" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Prayer Requests
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#8B6BAE18]">
          <Heart className="h-5 w-5 text-prayer" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          My Prayers
        </h2>
      </div>

      <p className="text-base text-[var(--color-text-secondary)] mb-6">
        Prayer requests you are lifting up in prayer.
      </p>

      {/* List */}
      {myPrayers.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center">
          <p className="text-base text-[var(--color-text-secondary)]">
            You have not marked any prayer requests yet. Visit the{" "}
            <Link href="/prayer" className="text-[var(--color-prayer)] font-medium hover:underline">
              Prayer Requests
            </Link>{" "}
            page to start praying for others.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myPrayers.map((request) => (
            <PrayerRequestCard
              key={request.id}
              request={request}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
