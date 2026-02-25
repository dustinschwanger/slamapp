"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LessonEditor } from "@/components/reading/LessonEditor";

export default function LessonEditPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary">
          Loading editor...
        </div>
      }
    >
      <LessonEditContent />
    </Suspense>
  );
}

function LessonEditContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("id");

  if (!lessonId) {
    return (
      <div className="p-8 text-center text-text-secondary">
        No lesson ID provided.
      </div>
    );
  }

  return <LessonEditor lessonId={lessonId} />;
}
