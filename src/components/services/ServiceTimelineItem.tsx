"use client";

import {
  Music,
  BookOpen,
  GraduationCap,
  Heart,
  Megaphone,
  FileText,
  ChevronUp,
  ChevronDown,
  Pencil,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ServicePlanItem, ServicePlanItemType } from "@/lib/types";

interface ServiceTimelineItemProps {
  item: ServicePlanItem;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

const typeConfig: Record<
  ServicePlanItemType,
  { icon: typeof Music; color: string; label: string }
> = {
  song: { icon: Music, color: "var(--color-worship)", label: "Song" },
  scripture: { icon: BookOpen, color: "var(--color-primary)", label: "Scripture" },
  lesson_block: { icon: GraduationCap, color: "#0891B2", label: "Lesson" },
  prayer_time: { icon: Heart, color: "var(--color-prayer)", label: "Prayer" },
  announcement: { icon: Megaphone, color: "var(--color-text-tertiary)", label: "Announcement" },
  custom: { icon: FileText, color: "var(--color-text-tertiary)", label: "Custom" },
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ServiceTimelineItem({
  item,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEdit,
}: ServiceTimelineItemProps) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 bg-[var(--color-bg-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)]"
      )}
    >
      {/* Position number */}
      <span className="text-sm font-semibold text-[var(--color-text-tertiary)] w-6 text-center shrink-0">
        {index + 1}
      </span>

      {/* Type icon */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] shrink-0"
        style={{ backgroundColor: `color-mix(in srgb, ${config.color} 15%, transparent)` }}
      >
        <Icon className="w-5 h-5" style={{ color: config.color }} />
      </div>

      {/* Title and type label */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-[var(--color-text-primary)] truncate">
          {item.title}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {config.label}
          {item.notes && ` \u2014 ${item.notes}`}
        </p>
      </div>

      {/* Duration badge */}
      <span className="text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] px-2 py-1 rounded-[var(--radius-sm)] shrink-0">
        {formatDuration(item.estimatedDurationSeconds)}
      </span>

      {/* Action buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={`Move ${item.title} up`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={`Move ${item.title} down`}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
        <button
          onClick={onEdit}
          className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
          aria-label={`Edit ${item.title}`}
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={onRemove}
          className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
          aria-label={`Remove ${item.title}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
