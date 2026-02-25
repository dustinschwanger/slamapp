"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronRight, Plus } from "lucide-react";
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
}

export function AddLessonBlockPanel({ onAddItem, lessons }: AddLessonBlockPanelProps) {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
      {lessons.length === 0 ? (
        <p className="text-center text-sm text-[var(--color-text-tertiary)] py-6">
          No lessons available.
        </p>
      ) : (
        lessons.map((lesson) => {
          const isExpanded = expandedLessonId === lesson.id;

          return (
            <div
              key={lesson.id}
              className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden"
            >
              {/* Lesson header */}
              <button
                onClick={() =>
                  setExpandedLessonId(isExpanded ? null : lesson.id)
                }
                className="flex items-center gap-3 w-full p-3 min-h-[48px] hover:bg-[var(--color-bg-surface)] transition-colors text-left"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] bg-[#0891B2]/10 shrink-0">
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
                <span className="text-sm text-[var(--color-text-tertiary)] shrink-0">
                  {lesson.blocks.length} blocks
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
                )}
              </button>

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

                  {lesson.blocks.map((block, blockIndex) => (
                    <button
                      key={blockIndex}
                      onClick={() => addBlock(lesson.id, blockIndex)}
                      className="flex items-start gap-3 p-2.5 min-h-[48px] rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-surface)] transition-colors text-left"
                    >
                      <Plus className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {BLOCK_TYPE_LABELS[block.type]}
                        </p>
                        <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2">
                          {block.content.substring(0, 120)}
                          {block.content.length > 120 ? "..." : ""}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
