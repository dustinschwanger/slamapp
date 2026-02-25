"use client";

import { ClipboardList, Copy, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonBlockRenderer } from "./LessonBlockRenderer";
import type { LessonContent, LessonBlock } from "@/lib/types";

interface LessonViewerProps {
  lesson: LessonContent;
  isTemplate?: boolean;
  onUseTemplate?: () => void;
  onEdit?: () => void;
  onProjectBlock?: (block: LessonBlock, index: number) => void;
  onAddBlockToService?: (block: LessonBlock, index: number) => void;
  onAddAllBlocksToService?: () => void;
}

export function LessonViewer({
  lesson,
  isTemplate,
  onUseTemplate,
  onEdit,
  onProjectBlock,
  onAddBlockToService,
  onAddAllBlocksToService,
}: LessonViewerProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        {isTemplate && (
          <Badge variant="secondary" className="mb-2">
            Template
          </Badge>
        )}
        <h1 className="text-3xl font-bold text-text-primary mb-1">
          {lesson.title}
        </h1>
        {lesson.subtitle && (
          <p className="text-xl text-text-secondary">{lesson.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-text-tertiary">
          {!isTemplate && lesson.date && (
            <>
              <span>{lesson.date}</span>
              <span aria-hidden="true">|</span>
            </>
          )}
          {!isTemplate && lesson.author && (
            <>
              <span>{lesson.author}</span>
              <span aria-hidden="true">|</span>
            </>
          )}
          <Badge variant="default">{lesson.scripture.primary}</Badge>
          {lesson.scripture.additional?.map((ref) => (
            <Badge key={ref} variant="secondary">
              {ref}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {isTemplate && onUseTemplate && (
            <Button
              variant="default"
              size="default"
              onClick={onUseTemplate}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Use Template
            </Button>
          )}
          {!isTemplate && onEdit && (
            <Button
              variant="outline"
              size="default"
              onClick={onEdit}
              className="gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Lesson
            </Button>
          )}
          {onAddAllBlocksToService && (
            <Button
              variant="outline"
              size="default"
              onClick={onAddAllBlocksToService}
              className="gap-2"
            >
              <ClipboardList className="h-4 w-4" />
              Add Entire Lesson to Service
            </Button>
          )}
        </div>
      </div>

      {/* Blocks */}
      {lesson.blocks.map((block, index) => (
        <LessonBlockRenderer
          key={index}
          block={block}
          index={index}
          onProject={onProjectBlock}
          onAddToService={onAddBlockToService}
        />
      ))}

      {/* Notes */}
      {lesson.notes && (
        <div className="mt-6 p-4 rounded-[var(--radius-md)] bg-bg-secondary border border-border">
          <p className="text-sm text-text-secondary">
            <strong>Notes:</strong> {lesson.notes}
          </p>
        </div>
      )}
    </div>
  );
}
