"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LessonContent, LessonBlock } from "@/lib/types";

interface LessonWithId extends LessonContent {
  id: string;
  isTemplate?: boolean;
}

function formatDate(dateString: string): string {
  const date = dateString.includes("T")
    ? new Date(dateString)
    : new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ScriptureBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="lesson-print-scripture my-6">
      {block.reference && (
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] mb-2">
          {block.reference}
          {block.version && ` (${block.version})`}
        </p>
      )}
      <div className="border-l-4 border-[var(--color-primary)] pl-5 py-1">
        <div
          className="font-reading text-lg leading-[1.8] italic text-[var(--color-text-primary)]"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      </div>
    </div>
  );
}

function TeacherNotesBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="lesson-print-teacher-notes my-6 rounded-[var(--radius-md)] border-2 border-dashed border-amber-300 bg-amber-50 p-5 print-teacher-notes">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
        For the Teacher
      </p>
      <div
        className="font-reading text-base leading-[1.7] text-[var(--color-text-primary)]"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

function DiscussionBlock({ block, questionStart }: { block: LessonBlock; questionStart: number }) {
  const questions = block.content
    .split(/\n\n+/)
    .filter((q) => q.trim().length > 0);

  return (
    <div className="lesson-print-discussion my-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] mb-3">
        Discussion
      </p>
      <ol
        start={questionStart}
        className="list-decimal list-outside ml-6 space-y-3"
      >
        {questions.map((q, i) => (
          <li
            key={i}
            className="font-reading text-lg leading-[1.7] text-[var(--color-text-primary)] pl-2"
          >
            {q}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ApplicationBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="lesson-print-application my-6 rounded-[var(--radius-md)] border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/8 p-5 print-application">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] mb-2">
        Application
      </p>
      <div
        className="font-reading text-lg leading-[1.7] text-[var(--color-text-primary)]"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

function PrayerBlock({ block, label }: { block: LessonBlock; label: string }) {
  return (
    <div className="lesson-print-prayer my-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-prayer)] mb-2">
        {label}
      </p>
      <div
        className="font-reading text-lg leading-[1.7] italic text-[var(--color-text-primary)]"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

function TeachingBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="lesson-print-teaching my-6">
      <div
        className="font-reading text-lg leading-[1.8] text-[var(--color-text-primary)]"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

function ContextBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="lesson-print-context my-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] mb-2">
        Context
      </p>
      <div
        className="font-reading text-lg leading-[1.7] text-[var(--color-text-secondary)]"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}

function LessonBlockPrint({
  block,
  questionStart,
}: {
  block: LessonBlock;
  questionStart: number;
}) {
  switch (block.type) {
    case "scripture_reading":
      return <ScriptureBlock block={block} />;
    case "teacher_notes":
      return <TeacherNotesBlock block={block} />;
    case "discussion":
      return <DiscussionBlock block={block} questionStart={questionStart} />;
    case "application":
      return <ApplicationBlock block={block} />;
    case "opening_prayer":
      return <PrayerBlock block={block} label="Opening Prayer" />;
    case "closing_prayer":
      return <PrayerBlock block={block} label="Closing Prayer" />;
    case "context":
      return <ContextBlock block={block} />;
    case "teaching":
      return <TeachingBlock block={block} />;
    default:
      return (
        <div className="my-6">
          <div
            className="font-reading text-lg leading-[1.7] text-[var(--color-text-primary)]"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        </div>
      );
  }
}

export default function PrintLessonPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    async function fetchLesson() {
      try {
        const res = await fetch(`/api/lessons/${params.id}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Lesson not found"
              : `Failed to load (${res.status})`
          );
        }
        const data = await res.json();
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-[var(--color-text-tertiary)]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-lg">Loading lesson...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertCircle className="w-12 h-12 text-[var(--color-error)]" />
        <p className="text-xl text-[var(--color-text-primary)] font-semibold">
          {error || "Lesson not found"}
        </p>
        <a
          href="/reading/lessons"
          className="text-[var(--color-primary)] hover:underline text-lg"
        >
          Back to Lessons
        </a>
      </div>
    );
  }

  // Track discussion question numbering
  let questionCounter = 1;

  return (
    <div className="max-w-3xl mx-auto lesson-print-page">
      {/* Print button (hidden when printing) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Print Preview
        </h2>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      {/* Printable content */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] p-8 print:shadow-none print:border-none print:p-0">
        {/* Title block */}
        <div className="border-b-2 border-[var(--color-border)] pb-6 mb-8 print:border-b-2 print:border-black text-center">
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            {lesson.title}
          </h1>
          {lesson.subtitle && (
            <p className="font-reading text-xl text-[var(--color-text-secondary)] italic mb-3">
              {lesson.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-base text-[var(--color-text-tertiary)]">
            <span className="font-semibold text-[var(--color-primary)]">
              {lesson.scripture.primary}
            </span>
            {lesson.scripture.additional?.map((ref) => (
              <span key={ref} className="text-[var(--color-text-secondary)]">
                {ref}
              </span>
            ))}
          </div>
          {lesson.date && (
            <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
              {formatDate(lesson.date)}
            </p>
          )}
        </div>

        {/* Lesson blocks */}
        {lesson.blocks.map((block, index) => {
          const currentQuestionStart = questionCounter;
          if (block.type === "discussion") {
            const qCount = block.content
              .split(/\n\n+/)
              .filter((q) => q.trim().length > 0).length;
            questionCounter += qCount;
          }
          return (
            <LessonBlockPrint
              key={index}
              block={block}
              questionStart={currentQuestionStart}
            />
          );
        })}

        {/* Notes section for handwriting */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] print:border-gray-300">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
            Notes
          </h2>
          <div className="h-32 border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] print:border-gray-300 print:h-40" />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[var(--color-border)] text-center print:border-gray-200">
          <p className="text-xs text-[var(--color-text-tertiary)] tracking-wide">
            SLAM &mdash; Senior Living Alliance Ministry
          </p>
        </div>
      </div>
    </div>
  );
}
