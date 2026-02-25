"use client";

import type { ServicePlanItem, AnnouncementItemData, CustomItemData } from "@/lib/types";

interface RunnerCustomContentProps {
  item: ServicePlanItem;
}

export function RunnerCustomContent({ item }: RunnerCustomContentProps) {
  const itemData = item.itemData as AnnouncementItemData | CustomItemData;

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center py-8">
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
        {item.title}
      </h2>

      <div className="font-reading text-xl leading-relaxed text-[var(--color-text-primary)]">
        {itemData.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className={i > 0 ? "mt-4" : ""}>
            {paragraph}
          </p>
        ))}
      </div>

      {item.notes && (
        <p className="mt-8 text-base text-[var(--color-text-tertiary)] italic">
          {item.notes}
        </p>
      )}
    </div>
  );
}
