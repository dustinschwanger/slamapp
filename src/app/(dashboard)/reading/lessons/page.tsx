"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Copy, Pencil, Loader2, Calendar, ChevronDown } from "lucide-react";
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
import { StudyPlanBuilder } from "@/components/reading/StudyPlanBuilder";
import { getAvailableBooks } from "@/lib/data/lesson-metadata";
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
  const [bookFilter, setBookFilter] = React.useState("All Books");
  const [showBookDropdown, setShowBookDropdown] = React.useState(false);
  const [showPlanBuilder, setShowPlanBuilder] = React.useState(false);
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

  const availableBooks = React.useMemo(() => getAvailableBooks(), []);
  const bookDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close book dropdown when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (bookDropdownRef.current && !bookDropdownRef.current.contains(e.target as Node)) {
        setShowBookDropdown(false);
      }
    }
    if (showBookDropdown) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showBookDropdown]);

  const currentLessons = activeTab === "templates" ? templates : myLessons;
  const selectedLesson = lessonId
    ? [...templates, ...myLessons].find((l) => l.id === lessonId)
    : null;

  /** Extract book name from scripture reference (e.g. "John 1:1-14" -> "John") */
  const getBookFromScripture = (ref: string) => {
    // Match everything before the first digit (handles "1 John", "2 Kings", etc.)
    const match = ref.match(/^(\d?\s*[A-Za-z]+)/);
    return match ? match[1].trim() : "";
  };

  const filteredLessons = currentLessons.filter((l) => {
    // Book filter
    if (bookFilter !== "All Books") {
      const lessonBook = getBookFromScripture(l.scripture.primary);
      if (lessonBook !== bookFilter) return false;
    }
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.title.toLowerCase().includes(q) ||
        l.scripture.primary.toLowerCase().includes(q) ||
        (l.subtitle?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

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
          lessonId={selectedLesson.id}
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
      <div className="flex gap-1 mb-6 bg-bg-secondary rounded-[var(--radius-md)] p-1 w-fit">
        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px]",
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
            "px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px]",
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
        <Link
          href="/reading/study-plans"
          className="px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors min-h-[44px] text-text-secondary hover:text-text-primary inline-flex items-center"
        >
          Study Plans
        </Link>
      </div>

      {/* Search + Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary pointer-events-none" />
          <Input
            type="search"
            placeholder={`Search ${activeTab === "templates" ? "templates" : "my lessons"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Book filter dropdown */}
        <div className="relative" ref={bookDropdownRef}>
          <button
            onClick={() => setShowBookDropdown(!showBookDropdown)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] text-sm font-medium text-text-primary hover:border-[var(--color-primary)] transition-colors min-h-[44px]"
          >
            <BookOpen className="h-4 w-4 text-text-tertiary" />
            {bookFilter}
            <ChevronDown className="h-4 w-4 text-text-tertiary" />
          </button>
          {showBookDropdown && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] py-1 min-w-[160px]">
              <button
                onClick={() => {
                  setBookFilter("All Books");
                  setShowBookDropdown(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors min-h-[44px]",
                  bookFilter === "All Books"
                    ? "text-[var(--color-primary)] font-medium bg-[#2D5A8E0A]"
                    : "text-text-primary hover:bg-[var(--color-bg-secondary)]"
                )}
              >
                All Books
              </button>
              {availableBooks.map((book) => (
                <button
                  key={book}
                  onClick={() => {
                    setBookFilter(book);
                    setShowBookDropdown(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors min-h-[44px]",
                    bookFilter === book
                      ? "text-[var(--color-primary)] font-medium bg-[#2D5A8E0A]"
                      : "text-text-primary hover:bg-[var(--color-bg-secondary)]"
                  )}
                >
                  Gospel of {book}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Create Study Plan button (templates tab only) */}
        {activeTab === "templates" && (
          <Button
            onClick={() => setShowPlanBuilder(true)}
            className="gap-2 min-h-[44px] shrink-0 bg-[#4A90D9] hover:bg-[#3A7BC8] text-white"
          >
            <Calendar className="h-4 w-4" />
            Create Study Plan
          </Button>
        )}
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

      {/* Study Plan Builder Modal */}
      <StudyPlanBuilder
        open={showPlanBuilder}
        onClose={() => setShowPlanBuilder(false)}
        lessons={templates}
        onPlanCreated={(studyPlanId) => {
          router.push(`/reading/study-plans/${studyPlanId}`);
        }}
      />
    </div>
  );
}
