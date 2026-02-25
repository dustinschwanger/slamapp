"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BibleReader } from "@/components/reading/BibleReader";
import { ScriptureProjection } from "@/components/reading/ScriptureProjection";
import { LessonProjection } from "@/components/reading/LessonProjection";
import type { LessonContent } from "@/lib/types";
import type { BibleChapter } from "@/lib/bible/types";

type Lesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
};

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
}

function ProjectContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const [mode, setMode] = React.useState<"choose" | "bible" | "lesson">("choose");
  const [projectedChapter, setProjectedChapter] = React.useState<BibleChapter | null>(null);
  const [projectedLessonId, setProjectedLessonId] = React.useState<string | null>(
    lessonId
  );
  const [lessons, setLessons] = React.useState<Lesson[]>([]);

  // TODO: Fetch lessons from API
  React.useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch("/api/lessons");
        if (res.ok) {
          const data = await res.json();
          setLessons(data.lessons ?? []);
        }
      } catch {
        // API not available yet
      }
    }
    fetchLessons();
  }, []);

  const projectedLesson = projectedLessonId
    ? lessons.find((l) => l.id === projectedLessonId)
    : null;

  // Auto-start lesson projection if passed via URL
  React.useEffect(() => {
    if (lessonId) {
      setMode("lesson");
      setProjectedLessonId(lessonId);
    }
  }, [lessonId]);

  if (mode === "bible") {
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={() => setMode("choose")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-bold text-text-primary">
            Scripture Projection
          </h2>
        </div>
        <div className="flex-1">
          <BibleReader
            onProjectRequest={(chapter) => setProjectedChapter(chapter)}
          />
        </div>
        {projectedChapter && (
          <ScriptureProjection
            chapter={projectedChapter}
            onClose={() => setProjectedChapter(null)}
          />
        )}
      </div>
    );
  }

  if (mode === "lesson" && projectedLesson) {
    return (
      <>
        <LessonProjection
          blocks={projectedLesson.blocks}
          onClose={() => {
            setMode("choose");
            setProjectedLessonId(null);
          }}
        />
      </>
    );
  }

  const publishedLessons = lessons.filter((l) => l.isPublished);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/reading"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover min-h-[48px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Reading Hub
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-2">Projection Mode</h2>
      <p className="text-text-secondary mb-6">
        Choose what to project for the group.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <button onClick={() => setMode("bible")} className="text-left cursor-pointer">
          <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow hover:-translate-y-0.5 transition-transform h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-[var(--radius-lg)] bg-primary/10 shrink-0">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary">Bible Scripture</h3>
                <p className="text-sm text-text-secondary">
                  Project scripture passages on screen
                </p>
              </div>
            </CardContent>
          </Card>
        </button>

        {/* Lesson options */}
        {publishedLessons.length === 0 ? (
          <Card className="h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-[var(--radius-lg)] bg-secondary/10 shrink-0">
                <FileText className="h-7 w-7 text-secondary opacity-40" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-tertiary">No Lessons Available</h3>
                <p className="text-sm text-text-tertiary">
                  Published lessons will appear here for projection
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          publishedLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                setProjectedLessonId(lesson.id);
                setMode("lesson");
              }}
              className="text-left cursor-pointer"
            >
              <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow hover:-translate-y-0.5 transition-transform h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="flex items-center justify-center h-14 w-14 rounded-[var(--radius-lg)] bg-secondary/10 shrink-0">
                    <FileText className="h-7 w-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {lesson.scripture.primary} - {lesson.scheduledDate}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
