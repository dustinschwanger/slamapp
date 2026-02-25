"use client";

import { GraduationCap } from "lucide-react";
import { LessonBlockRenderer } from "@/components/reading/LessonBlockRenderer";
import type { ServicePlanItem, LessonBlockItemData, LessonContent } from "@/lib/types";

interface LessonWithId extends LessonContent {
  id: string;
}

interface RunnerLessonContentProps {
  item: ServicePlanItem;
  lessons: LessonWithId[];
}

export function RunnerLessonContent({ item, lessons }: RunnerLessonContentProps) {
  const itemData = item.itemData as LessonBlockItemData;
  const lesson = lessons.find((l) => l.id === itemData.lessonId);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-tertiary)]">
        <GraduationCap className="w-12 h-12" />
        <p className="text-xl">Lesson not found</p>
        <p className="text-sm">
          The lesson referenced by this item could not be located.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        {lesson.title}
      </h2>
      {lesson.subtitle && (
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          {lesson.subtitle}
        </p>
      )}
      <div className="space-y-6">
        {lesson.blocks.map((block, index) => (
          <LessonBlockRenderer key={index} block={block} index={index} />
        ))}
      </div>
    </div>
  );
}
