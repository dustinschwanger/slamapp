"use client";

import { HandHeart } from "lucide-react";
import { PrayerRequestCard } from "@/components/prayer/PrayerRequestCard";
import type { ServicePlanItem, PrayerTimeItemData, PrayerRequest } from "@/lib/types";

interface RunnerPrayerContentProps {
  item: ServicePlanItem;
  prayerRequests: PrayerRequest[];
}

export function RunnerPrayerContent({ item, prayerRequests }: RunnerPrayerContentProps) {
  const itemData = item.itemData as PrayerTimeItemData;

  let requests = [...prayerRequests];

  if (itemData.roomId) {
    requests = requests.filter((r) => r.room === itemData.roomId);
  } else if (itemData.communityId) {
    requests = requests.filter((r) => r.communityId === itemData.communityId);
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <HandHeart className="w-7 h-7 text-[var(--color-prayer)]" />
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {item.title}
        </h2>
      </div>

      {item.notes && (
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          {item.notes}
        </p>
      )}

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-[var(--color-text-tertiary)]">
          <HandHeart className="w-12 h-12" />
          <p className="text-xl">No prayer requests for this session</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <PrayerRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
