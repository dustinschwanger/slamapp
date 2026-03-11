"use client";

import { useMemo, useState } from "react";
import { GraduationCap, ChevronDown, ChevronRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { stripHtml } from "@/lib/utils/sanitize";
import { Button } from "@/components/ui/button";
import { BLOCK_TYPE_LABELS, BLOCK_DURATIONS } from "@/lib/constants/lessons";
import type { ServicePlanItem, LessonContent } from "@/lib/types";

interface LessonWithMeta extends LessonContent {
  id: string;
  scheduledDate?: string;
  isPublished?: boolean;
}

interface AddLessonBlockPanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
  lessons: LessonWithMeta[];
  existingItems?: ServicePlanItem[];
}

export function AddLessonBlockPanel({ onAddItem, lessons, existingItems = [] }: AddLessonBlockPanelProps) {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // Set of lesson IDs already in the timeline
  const addedLessonIds = useMemo(() => {
    const ids = new Set<string>();
    for (const item of existingItems) {
      if (item.type === "lesson_block" && "lessonId" in item.itemData) {
        ids.add(item.itemData.lessonId);
      }
    }
    return ids;
  }, [existingItems]);

  function addBlock(lessonId: string, blockIndex: number) {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    const block = lesson.blocks[blockIndex];
    if (!block) return;

    const label = BLOCK_TYPE_LABELS[block.type];

    onAddItem({
      type: "lesson_block",
      title: `${label}: ${lesson.title}`,
      estimatedDurationSeconds: BLOCK_DURATIONS[block.type],
      itemData: { lessonId, blockIndex },
    });
  }

  function addAllBlocks(lessonId: string) {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    lesson.blocks.forEach((block, blockIndex) => {
      const label = BLOCK_TYPE_LABELS[block.type];
      onAddItem({
        type: "lesson_block",
        title: `${label}: ${lesson.title}`,
        estimatedDurationSeconds: BLOCK_DURATIONS[block.type],
        itemData: { lessonId, blockIndex },
      });
    });
  }

  if (lessons.length === 0) {
    return (
      <p className="text-center text-sm text-[var(--color-text-tertiary)] py-6">
        No lessons available.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[384px] overflow-y-auto">
      {lessons.map((lesson) => {
        const isExpanded = expandedLessonId === lesson.id;
        const isAdded = addedLessonIds.has(lesson.id);

        return (
          <div
            key={lesson.id}
            className={cn(
              "bg-[var(--color-bg-card)] rounded-[var(--radius-md)] border border-[var(--color-border)]",
              isAdded && "opacity-50"
            )}
          >
            {/* Lesson header — use div with role=button to avoid Firefox
                button + flex + min-height rendering bug */}
            <div
              role="button"
              tabIndex={0}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} lesson: ${lesson.title}`}
              onClick={() =>
                setExpandedLessonId(isExpanded ? null : lesson.id)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedLessonId(isExpanded ? null : lesson.id);
                }
              }}
              className="flex items-center gap-3 w-full p-3 min-h-[48px] hover:bg-[var(--color-bg-surface)] transition-colors text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5A8E]"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] bg-[color:rgb(8_145_178_/_0.1)] shrink-0">
                <GraduationCap className="w-4 h-4 text-[#0891B2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-[var(--color-text-primary)] truncate">
                  {lesson.title}
                </p>
                {lesson.subtitle && (
                  <p className="text-sm text-[var(--color-text-secondary)] truncate">
                    {lesson.subtitle}
                  </p>
                )}
              </div>
              {isAdded && (
                <Check className="w-4 h-4 text-[var(--color-success)] shrink-0" />
              )}
              <span className="text-sm text-[var(--color-text-tertiary)] shrink-0">
                {lesson.blocks.length} blocks
              </span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
              )}
            </div>

            {/* Expanded blocks */}
            {isExpanded && (
              <div className="border-t border-[var(--color-border)] p-3 flex flex-col gap-2">
                {/* Add All button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAllBlocks(lesson.id)}
                  className="gap-2 self-start mb-1"
                >
                  <Plus className="w-4 h-4" />
                  Add All Blocks
                </Button>

                {lesson.blocks.map((block, blockIndex) => {
                  const plainContent = stripHtml(block.content);
                  return (
                    <div
                      key={blockIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Add ${BLOCK_TYPE_LABELS[block.type]} block from ${lesson.title}`}
                      onClick={() => addBlock(lesson.id, blockIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          addBlock(lesson.id, blockIndex);
                        }
                      }}
                      className="flex items-start gap-3 p-2.5 min-h-[48px] rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-surface)] transition-colors text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D5A8E]"
                    >
                      <Plus className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {BLOCK_TYPE_LABELS[block.type]}
                        </p>
                        <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2">
                          {plainContent.substring(0, 120)}
                          {plainContent.length > 120 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
