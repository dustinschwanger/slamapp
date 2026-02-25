import { Clock } from "lucide-react";
import type { ServicePlanItem } from "@/lib/types";

interface DurationEstimateProps {
  items: ServicePlanItem[];
}

function formatTotalDuration(totalSeconds: number): string {
  const totalMinutes = Math.round(totalSeconds / 60);
  if (totalMinutes < 60) {
    return `~${totalMinutes} minutes`;
  }
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (mins === 0) return `~${hrs}h`;
  return `~${hrs}h ${mins}m`;
}

export function DurationEstimate({ items }: DurationEstimateProps) {
  const totalSeconds = items.reduce(
    (sum, item) => sum + item.estimatedDurationSeconds,
    0
  );

  return (
    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
      <Clock className="h-4 w-4 shrink-0" />
      <span>
        {items.length} {items.length === 1 ? "item" : "items"} &middot;{" "}
        {formatTotalDuration(totalSeconds)}
      </span>
    </div>
  );
}
