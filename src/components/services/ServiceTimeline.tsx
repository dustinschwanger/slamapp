"use client";

import { ListChecks } from "lucide-react";
import type { ServicePlanItem } from "@/lib/types";
import { ServiceTimelineItem } from "@/components/services/ServiceTimelineItem";
import { DurationEstimate } from "@/components/services/DurationEstimate";

interface ServiceTimelineProps {
  items: ServicePlanItem[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
}

export function ServiceTimeline({
  items,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
}: ServiceTimelineProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header with duration estimate */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Service Order
        </h3>
        {items.length > 0 && <DurationEstimate items={items} />}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ListChecks className="h-10 w-10 mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-base text-[var(--color-text-secondary)]">
            No items yet. Add songs, scripture, lessons, or other items to build
            your service plan.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <ServiceTimelineItem
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              onMoveUp={() => onMoveUp(index)}
              onMoveDown={() => onMoveDown(index)}
              onRemove={() => onRemove(index)}
              onEdit={() => onEdit(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
