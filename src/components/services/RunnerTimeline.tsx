"use client";

import { useEffect, useRef } from "react";
import {
  Music,
  BookOpen,
  GraduationCap,
  HandHeart,
  Megaphone,
  FileText,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ServicePlanItemType } from "@/lib/types";
import type { StepGroup } from "./ServiceRunner";

interface RunnerTimelineProps {
  groups: StepGroup[];
  currentGroupIndex: number;
  completedGroupIndexes: Set<number>;
  onSelectGroup: (groupIndex: number) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const typeIcons: Record<ServicePlanItemType, typeof Music> = {
  song: Music,
  scripture: BookOpen,
  lesson_block: GraduationCap,
  prayer_time: HandHeart,
  announcement: Megaphone,
  custom: FileText,
};

export function RunnerTimeline({
  groups,
  currentGroupIndex,
  completedGroupIndexes,
  onSelectGroup,
  collapsed,
  onToggleCollapse,
}: RunnerTimelineProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll to keep current group visible
  useEffect(() => {
    const ref = itemRefs.current[currentGroupIndex];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentGroupIndex]);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--color-border)]">
        {!collapsed && (
          <span className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
            Service Order
          </span>
        )}
        <button
          onClick={onToggleCollapse}
          className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] transition-colors"
          aria-label={collapsed ? "Expand timeline" : "Collapse timeline"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Group list */}
      <div className="flex-1 overflow-y-auto py-2">
        {groups.map((group, index) => {
          const Icon = typeIcons[group.type];
          const isCurrent = index === currentGroupIndex;
          const isCompleted = completedGroupIndexes.has(index);

          return (
            <button
              key={`${group.type}-${group.startIndex}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => onSelectGroup(index)}
              className={cn(
                "flex items-center gap-3 w-full text-left transition-colors",
                collapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
                isCurrent &&
                  "bg-[var(--color-primary)] text-white",
                !isCurrent &&
                  isCompleted &&
                  "opacity-50",
                !isCurrent &&
                  !isCompleted &&
                  "hover:bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"
              )}
              aria-label={`${group.title}${isCurrent ? " (current)" : ""}${isCompleted ? " (completed)" : ""}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              {/* Icon / check */}
              <span
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                  isCurrent
                    ? "bg-white/20"
                    : isCompleted
                      ? "bg-[var(--color-success)]/10"
                      : "bg-[var(--color-bg-surface)]"
                )}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4 text-[var(--color-success)]" />
                ) : (
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      isCurrent ? "text-white" : "text-[var(--color-text-tertiary)]"
                    )}
                  />
                )}
              </span>

              {/* Title */}
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-sm font-medium truncate",
                      isCurrent ? "text-white" : "",
                      isCompleted && !isCurrent ? "line-through" : ""
                    )}
                  >
                    {group.title}
                  </span>
                  <span
                    className={cn(
                      "block text-xs",
                      isCurrent
                        ? "text-white/70"
                        : "text-[var(--color-text-tertiary)]"
                    )}
                  >
                    {index + 1} of {groups.length}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
