"use client";

import * as React from "react";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { toast } from "sonner";
import {
  getAvailableBooks,
  getMetadataByBook,
  getMetadataByBooks,
} from "@/lib/data/lesson-metadata";
import { suggestLessons } from "@/lib/utils/study-plan-algorithm";
import type { LessonContent } from "@/lib/types";

type Lesson = LessonContent & {
  id: string;
  scheduledDate: string;
  isPublished: boolean;
  isTemplate?: boolean;
};

interface StudyPlanBuilderProps {
  open: boolean;
  onClose: () => void;
  lessons: Lesson[];
  onPlanCreated?: (studyPlanId: string) => void;
}

const WEEK_PRESETS = [4, 6, 8, 12, 15, 20, 30];

export function StudyPlanBuilder({
  open,
  onClose,
  lessons,
  onPlanCreated,
}: StudyPlanBuilderProps) {
  const [step, setStep] = React.useState(1);
  const [selectedBooks, setSelectedBooks] = React.useState<string[]>([]);
  const [weekCount, setWeekCount] = React.useState(0);
  const [customWeeks, setCustomWeeks] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiReasoning, setAiReasoning] = React.useState("");
  const [planName, setPlanName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const books = React.useMemo(() => getAvailableBooks(), []);
  const bookMetadata = React.useMemo(
    () => (selectedBooks.length > 0 ? getMetadataByBooks(selectedBooks) : []),
    [selectedBooks]
  );
  const maxWeeks = bookMetadata.length;

  // Reset state when opened
  React.useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedBooks([]);
      setWeekCount(0);
      setCustomWeeks("");
      setSelectedIds([]);
      setAiPrompt("");
      setAiLoading(false);
      setAiReasoning("");
      setPlanName("");
      setStartDate("");
      setSaving(false);
      setSaveError("");
    }
  }, [open]);

  // Manage dialog open/close
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = React.useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  // Auto-suggest when advancing to step 2
  const handleAdvanceToStep2 = React.useCallback(() => {
    const weeks =
      weekCount > 0 ? weekCount : parseInt(customWeeks) || maxWeeks;
    if (selectedBooks.length === 0 || weeks <= 0) return;

    const effectiveWeeks = Math.min(weeks, maxWeeks);
    setWeekCount(effectiveWeeks);

    const suggested = suggestLessons(bookMetadata, effectiveWeeks);
    setSelectedIds(suggested);
    const booksLabel = selectedBooks.join(" & ");
    setPlanName(`${booksLabel} - ${effectiveWeeks} Week Study`);
    setAiReasoning("");
    setStep(2);
  }, [selectedBooks, weekCount, customWeeks, maxWeeks, bookMetadata]);

  const handleAiSuggest = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiReasoning("");
    try {
      const res = await fetch("/api/study-plans/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: bookMetadata,
          weekCount: selectedIds.length || weekCount,
          customPrompt: aiPrompt,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 503) {
          toast.error("AI suggestions are not configured. Using priority-based selection.");
        } else {
          toast.error(data.error || "AI suggestion failed");
        }
        return;
      }

      const data = await res.json();
      if (data.lessonIds?.length > 0) {
        setSelectedIds(data.lessonIds);
        setAiReasoning(data.reasoning || "");
        toast.success("AI updated the lesson selection");
      }
    } catch {
      toast.error("Failed to get AI suggestions");
    } finally {
      setAiLoading(false);
    }
  };

  const toggleLesson = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");

  const handleSave = async () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name");
      return;
    }
    if (selectedIds.length === 0) {
      toast.error("Please select at least one lesson");
      return;
    }

    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/study-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: planName.trim(),
          book: selectedBooks.join(", "),
          lessonIds: selectedIds,
          startDate: startDate || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.error || `Failed to create study plan (${res.status})`;
        setSaveError(msg);
        toast.error(msg);
        return;
      }

      const data = await res.json();
      toast.success("Study plan created!");
      onClose();
      if (onPlanCreated) {
        onPlanCreated(data.studyPlanId);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create study plan";
      setSaveError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const getLessonForId = (id: string) => lessons.find((l) => l.id === id);

  const priorityBadgeColor = (priority: number) => {
    if (priority >= 9) return "bg-[var(--color-success)] text-white";
    if (priority >= 7) return "bg-[var(--color-primary)] text-white";
    if (priority >= 5) return "bg-[var(--color-warning)] text-white";
    return "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]";
  };

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-0 h-full w-full max-h-full max-w-full bg-transparent p-0 backdrop:bg-black/50"
      onClick={handleBackdropClick}
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          ref={contentRef}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8 shadow-[var(--shadow-lg)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pr-10">
            <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                Create Study Plan
              </h2>
              <p className="text-sm text-text-secondary">
                Step {step} of 3
              </p>
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s <= step
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-bg-secondary)]"
                )}
              />
            ))}
          </div>

          {/* Step 1: Book & Duration */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-text-primary mb-3">
                  Choose Books of the Bible
                </label>
                <p className="text-sm text-text-secondary mb-3">
                  Select one or more books to include in your study plan.
                </p>
                <div className="flex flex-wrap gap-2">
                  {books.map((book) => {
                    const count = getMetadataByBook(book).length;
                    const isSelected = selectedBooks.includes(book);
                    return (
                      <button
                        key={book}
                        onClick={() => {
                          setSelectedBooks((prev) =>
                            isSelected
                              ? prev.filter((b) => b !== book)
                              : [...prev, book]
                          );
                          setWeekCount(0);
                          setCustomWeeks("");
                        }}
                        className={cn(
                          "px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors min-h-[48px] border flex items-center gap-2",
                          isSelected
                            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                            : "bg-[var(--color-bg-card)] text-text-primary border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        )}
                      >
                        {isSelected && <Check className="h-4 w-4" />}
                        {book}{" "}
                        <span className="text-sm opacity-75">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedBooks.length > 0 && (
                <div>
                  <label className="block text-base font-medium text-text-primary mb-3">
                    Number of Weeks
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {WEEK_PRESETS.filter((w) => w <= maxWeeks).map((w) => (
                      <button
                        key={w}
                        onClick={() => {
                          setWeekCount(w);
                          setCustomWeeks("");
                        }}
                        className={cn(
                          "px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors min-h-[48px] border",
                          weekCount === w
                            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                            : "bg-[var(--color-bg-card)] text-text-primary border-[var(--color-border)] hover:border-[var(--color-primary)]"
                        )}
                      >
                        {w} weeks
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setWeekCount(maxWeeks);
                        setCustomWeeks("");
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors min-h-[48px] border",
                        weekCount === maxWeeks &&
                          !WEEK_PRESETS.includes(maxWeeks)
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                          : "bg-[var(--color-bg-card)] text-text-primary border-[var(--color-border)] hover:border-[var(--color-primary)]"
                      )}
                    >
                      All ({maxWeeks})
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-secondary">or</span>
                    <Input
                      type="number"
                      min={1}
                      max={maxWeeks}
                      placeholder="Custom..."
                      value={customWeeks}
                      onChange={(e) => {
                        setCustomWeeks(e.target.value);
                        setWeekCount(0);
                      }}
                      className="w-32"
                    />
                    <span className="text-sm text-text-secondary">weeks</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleAdvanceToStep2}
                  disabled={
                    selectedBooks.length === 0 || (weekCount <= 0 && !customWeeks)
                  }
                  className="gap-2 min-h-[48px]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Review Suggested Lessons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-base text-text-secondary mb-1">
                  {selectedBooks.join(", ")} &middot; {selectedIds.length} of {maxWeeks}{" "}
                  lessons selected
                </p>
              </div>

              {/* AI Customization */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-[var(--color-prayer)]" />
                  <span className="text-sm font-medium text-text-primary">
                    Customize with AI
                  </span>
                  <span className="text-xs text-text-tertiary">(optional)</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder='e.g. "Focus on parables" or "Emphasize healing miracles"'
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !aiLoading) handleAiSuggest();
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAiSuggest}
                    disabled={!aiPrompt.trim() || aiLoading}
                    variant="outline"
                    className="gap-2 min-h-[48px] shrink-0"
                  >
                    {aiLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    Suggest
                  </Button>
                </div>
                {aiReasoning && (
                  <p className="mt-2 text-sm text-text-secondary italic">
                    {aiReasoning}
                  </p>
                )}
              </div>

              {/* Lesson list */}
              <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                {selectedBooks.map((book) => {
                  const bookLessons = bookMetadata.filter((m) => m.book === book);
                  return (
                    <React.Fragment key={book}>
                      {selectedBooks.length > 1 && (
                        <div className="sticky top-0 z-10 bg-[var(--color-bg-card)] pt-2 pb-1 border-b border-[var(--color-border)]">
                          <span className="text-sm font-bold text-text-primary">
                            {book}
                          </span>
                          <span className="text-xs text-text-secondary ml-2">
                            {bookLessons.filter((m) => selectedIds.includes(m.id)).length} of {bookLessons.length} selected
                          </span>
                        </div>
                      )}
                      {bookLessons.map((meta) => {
                        const lesson = getLessonForId(meta.id);
                        const isSelected = selectedIds.includes(meta.id);
                        return (
                          <button
                            key={meta.id}
                            onClick={() => toggleLesson(meta.id)}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-[var(--radius-md)] border transition-colors min-h-[48px] flex items-start gap-3",
                              isSelected
                                ? "border-[var(--color-primary)] bg-[#2D5A8E0A]"
                                : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-primary)]"
                            )}
                          >
                            <div
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                                isSelected
                                  ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                                  : "border-[var(--color-border)]"
                              )}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-text-primary">
                                  {lesson?.title || `Lesson ${meta.lessonNumber}`}
                                </span>
                                <span
                                  className={cn(
                                    "inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded",
                                    priorityBadgeColor(meta.priority)
                                  )}
                                >
                                  P{meta.priority}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary mt-0.5">
                                {lesson?.scripture.primary || meta.summary}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {meta.themes.slice(0, 3).map((theme) => (
                                  <span
                                    key={theme}
                                    className="text-xs text-text-tertiary bg-[var(--color-bg-secondary)] px-1.5 py-0.5 rounded"
                                  >
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="gap-2 min-h-[48px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={selectedIds.length === 0}
                  className="gap-2 min-h-[48px]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Save */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-text-primary mb-2">
                  Plan Name
                </label>
                <Input
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g. Spring Matthew Study"
                  className="max-w-md"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-text-primary mb-2">
                  Start Date (optional)
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="max-w-[200px]"
                />
              </div>

              <div>
                <h3 className="text-base font-medium text-text-primary mb-3">
                  {selectedIds.length} Lessons in Order
                </h3>
                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                  {[...selectedIds]
                    .sort((a, b) => {
                      const metaA = bookMetadata.find((m) => m.id === a);
                      const metaB = bookMetadata.find((m) => m.id === b);
                      const bookA = selectedBooks.indexOf(metaA?.book ?? "");
                      const bookB = selectedBooks.indexOf(metaB?.book ?? "");
                      if (bookA !== bookB) return bookA - bookB;
                      return (
                        (metaA?.lessonNumber ?? 0) -
                        (metaB?.lessonNumber ?? 0)
                      );
                    })
                    .map((id, index) => {
                      const lesson = getLessonForId(id);
                      const meta = bookMetadata.find((m) => m.id === id);
                      const weekDate =
                        startDate
                          ? (() => {
                              const d = new Date(startDate);
                              d.setDate(d.getDate() + index * 7);
                              return d.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              });
                            })()
                          : null;

                      return (
                        <div
                          key={id}
                          className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                        >
                          <span className="text-sm font-bold text-[var(--color-primary)] w-8 shrink-0">
                            W{index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {lesson?.title || `Lesson ${id}`}
                              </p>
                              {selectedBooks.length > 1 && meta && (
                                <span className="text-xs text-text-tertiary bg-[var(--color-bg-secondary)] px-1.5 py-0.5 rounded shrink-0">
                                  {meta.book}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary">
                              {lesson?.scripture.primary}
                            </p>
                          </div>
                          {weekDate && (
                            <span className="text-xs text-text-tertiary shrink-0">
                              {weekDate}
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {saveError && (
                <div className="rounded-[var(--radius-md)] border border-[var(--color-error)] bg-[var(--color-error)]/10 p-3 text-sm text-[var(--color-error)]">
                  {saveError}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="gap-2 min-h-[48px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="gap-2 min-h-[48px]"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {saving ? "Creating..." : "Save Plan"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
