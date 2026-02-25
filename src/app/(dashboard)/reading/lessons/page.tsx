"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Copy, Pencil, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LessonViewer } from "@/components/reading/LessonViewer";
import { LessonProjection } from "@/components/reading/LessonProjection";
import { AddToServiceDialog } from "@/components/services/AddToServiceDialog";
import { useAddToService } from "@/hooks/useAddToService";
import { BLOCK_TYPE_LABELS, BLOCK_DURATIONS } from "@/lib/constants/lessons";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";
import type { LessonContent, LessonBlock } from "@/lib/types";

type Lesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
  isTemplate?: boolean;
  sourceTemplateId?: string | null;
};

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary">
          Loading lessons...
        </div>
      }
    >
      <LessonsContent />
    </Suspense>
  );
}

function LessonsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lessonId = searchParams.get("id");
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = React.useState<"templates" | "my-lessons">(
    tabParam === "my-lessons" ? "my-lessons" : "templates"
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [templates, setTemplates] = React.useState<Lesson[]>([]);
  const [myLessons, setMyLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [duplicating, setDuplicating] = React.useState<string | null>(null);
  const [projectionState, setProjectionState] = React.useState<{
    blocks: LessonBlock[];
    startIndex: number;
  } | null>(null);
  const addToService = useAddToService();

  // Fetch templates
  React.useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/lessons?tab=templates");
        if (res.ok) {
          const data = await res.json();
          setTemplates(data.lessons ?? []);
        }
      } catch {
        // API not available yet
      }
    }
    fetchTemplates();
  }, []);

  // Fetch my lessons
  React.useEffect(() => {
    async function fetchMyLessons() {
      try {
        const res = await fetch("/api/lessons?tab=my-lessons");
        if (res.ok) {
          const data = await res.json();
          setMyLessons(data.lessons ?? []);
        }
      } catch {
        // API not available yet
      } finally {
        setLoading(false);
      }
    }
    fetchMyLessons();
  }, []);

  const handleDuplicate = async (lessonId: string) => {
    setDuplicating(lessonId);
    try {
      const res = await fetch(`/api/lessons/${lessonId}/duplicate`, {
        method: "POST",
      });
      if (res.ok) {
        const newLesson = await res.json();
        setMyLessons((prev) => [newLesson, ...prev]);
        toast.success("Lesson copied to My Lessons");
        setActiveTab("my-lessons");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to copy lesson");
      }
    } catch {
      toast.error("Failed to copy lesson");
    } finally {
      setDuplicating(null);
    }
  };

  const currentLessons = activeTab === "templates" ? templates : myLessons;
  const selectedLesson = lessonId
    ? [...templates, ...myLessons].find((l) => l.id === lessonId)
    : null;

  const filteredLessons = searchQuery
    ? currentLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.scripture.primary
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          l.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentLessons;

  // Show single lesson view
  if (selectedLesson) {
    const isTemplate = selectedLesson.isTemplate ?? false;

    return (
      <div>
        <Link
          href={`/reading/lessons?tab=${isTemplate ? "templates" : "my-lessons"}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover mb-6 min-h-[48px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {isTemplate ? "Templates" : "My Lessons"}
        </Link>

        <LessonViewer
          lesson={selectedLesson}
          isTemplate={isTemplate}
          onUseTemplate={
            isTemplate ? () => handleDuplicate(selectedLesson.id) : undefined
          }
          onEdit={
            !isTemplate
              ? () =>
                  router.push(
                    `/reading/lessons/edit?id=${selectedLesson.id}`
                  )
              : undefined
          }
          onProjectBlock={(block, index) =>
            setProjectionState({
              blocks: selectedLesson.blocks,
              startIndex: index,
            })
          }
          onAddBlockToService={(block, index) => {
            const label = BLOCK_TYPE_LABELS[block.type];
            addToService.openDialog({
              type: "lesson_block",
              title: `${label}: ${selectedLesson.title}`,
              estimatedDurationSeconds: BLOCK_DURATIONS[block.type],
              itemData: {
                lessonId: selectedLesson.id,
                blockIndex: index,
              },
            });
          }}
          onAddAllBlocksToService={() => {
            const items = selectedLesson.blocks.map((block, index) => ({
              type: "lesson_block" as const,
              title: `${BLOCK_TYPE_LABELS[block.type]}: ${selectedLesson.title}`,
              estimatedDurationSeconds: BLOCK_DURATIONS[block.type],
              itemData: {
                lessonId: selectedLesson.id,
                blockIndex: index,
              },
            }));
            addToService.openDialog(items);
          }}
        />

        {projectionState && (
          <LessonProjection
            blocks={projectionState.blocks}
            startIndex={projectionState.startIndex}
            onClose={() => setProjectionState(null)}
          />
        )}

        <AddToServiceDialog
          isOpen={addToService.isOpen}
          onClose={addToService.closeDialog}
          plans={addToService.plans}
          plansLoading={addToService.plansLoading}
          isSubmitting={addToService.isSubmitting}
          onSelectPlan={addToService.addToPlan}
          itemCount={addToService.pendingItemCount}
          itemLabel={
            addToService.pendingItemCount === 1 ? "block" : "blocks"
          }
        />
      </div>
    );
  }

  // Show lesson list
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Lessons</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-bg-secondary rounded-[var(--radius-md)] p-1 max-w-sm">
        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px]",
            activeTab === "templates"
              ? "bg-bg-card text-text-primary shadow-[var(--shadow-sm)]"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab("my-lessons")}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px]",
            activeTab === "my-lessons"
              ? "bg-bg-card text-text-primary shadow-[var(--shadow-sm)]"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          My Lessons
          {myLessons.length > 0 && (
            <span className="ml-1.5 text-xs text-text-tertiary">
              ({myLessons.length})
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary pointer-events-none" />
        <Input
          type="search"
          placeholder={`Search ${activeTab === "templates" ? "templates" : "my lessons"}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lesson cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">
            {searchQuery
              ? `No ${activeTab === "templates" ? "templates" : "lessons"} found`
              : activeTab === "my-lessons"
                ? "No lessons yet"
                : "No templates available"}
          </p>
          <p className="text-sm mt-1">
            {searchQuery
              ? `Try a different search term`
              : activeTab === "my-lessons"
                ? 'Use a template to create your first lesson'
                : "Templates will appear here"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="hover:shadow-[var(--shadow-lg)] transition-shadow h-full flex flex-col"
            >
              <Link
                href={`/reading/lessons?id=${lesson.id}&tab=${activeTab}`}
                className="block group flex-1"
              >
                <CardHeader>
                  {activeTab === "my-lessons" && (
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-tertiary">
                        {lesson.scheduledDate || "No date set"}
                      </span>
                      {!lesson.isPublished && (
                        <Badge variant="warning">Draft</Badge>
                      )}
                    </div>
                  )}
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {lesson.title}
                  </CardTitle>
                  {lesson.subtitle && (
                    <CardDescription>{lesson.subtitle}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="default">
                      {lesson.scripture.primary}
                    </Badge>
                    {lesson.scripture.additional?.map((ref) => (
                      <Badge key={ref} variant="secondary">
                        {ref}
                      </Badge>
                    ))}
                  </div>
                  {activeTab === "my-lessons" && lesson.author && (
                    <p className="text-sm text-text-tertiary">
                      By {lesson.author}
                    </p>
                  )}
                </CardContent>
              </Link>
              <div className="px-6 pb-4 flex gap-2">
                {activeTab === "templates" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(lesson.id)}
                    disabled={duplicating === lesson.id}
                    className="gap-1.5"
                  >
                    {duplicating === lesson.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    Use Template
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(`/reading/lessons/edit?id=${lesson.id}`)
                    }
                    className="gap-1.5"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
