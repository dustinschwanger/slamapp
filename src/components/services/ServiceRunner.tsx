"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useServiceRunner } from "@/hooks/useServiceRunner";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { RunnerTimeline } from "./RunnerTimeline";
import { RunnerContentArea } from "./RunnerContentArea";
import { RunnerProjectionBridge } from "./RunnerProjectionBridge";
import { PostServiceNotes } from "./PostServiceNotes";
import type { ServicePlan, ServicePlanItemType, ScriptureItemData, LessonBlockItemData, Song, LessonContent, PrayerRequest, ServicePlanItem } from "@/lib/types";
import type { BibleChapter } from "@/lib/bible/types";

export interface StepGroup {
  startIndex: number;
  endIndex: number;
  title: string;
  type: ServicePlanItemType;
}

interface LessonWithId extends LessonContent {
  id: string;
}

interface ServiceRunnerProps {
  plan: ServicePlan;
}

function computeStepGroups(items: ServicePlan["items"]): StepGroup[] {
  const groups: StepGroup[] = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    if (item.type === "lesson_block") {
      const lessonId = (item.itemData as LessonBlockItemData).lessonId;
      // Extract lesson title from the item title (format: "Block Type: Lesson Title")
      const colonIdx = item.title.indexOf(":");
      const lessonTitle = colonIdx > 0 ? item.title.substring(colonIdx + 1).trim() : item.title;
      const startIndex = i;
      // Merge consecutive lesson_block items with the same lessonId
      while (
        i + 1 < items.length &&
        items[i + 1].type === "lesson_block" &&
        (items[i + 1].itemData as LessonBlockItemData).lessonId === lessonId
      ) {
        i++;
      }
      groups.push({ startIndex, endIndex: i, title: lessonTitle, type: "lesson_block" });
    } else {
      groups.push({ startIndex: i, endIndex: i, title: item.title, type: item.type });
    }
    i++;
  }
  return groups;
}

export function ServiceRunner({ plan }: ServiceRunnerProps) {
  const player = useAudioPlayer();

  const [timelineCollapsed, setTimelineCollapsed] = useState(false);
  const [showPostNotes, setShowPostNotes] = useState(false);
  // Cache loaded chapters by chapterId
  const [chapterCache, setChapterCache] = useState<Record<string, BibleChapter>>({});

  // Data arrays fetched from API
  const [songs, setSongs] = useState<Song[]>([]);
  const [lessons, setLessons] = useState<LessonWithId[]>([]);
  const [prayerRequests] = useState<PrayerRequest[]>([]);

  // Compute step groups (merges consecutive lesson blocks)
  const stepGroups = useMemo(() => computeStepGroups(plan.items), [plan.items]);

  // Group-aware navigation callbacks
  const findCurrentGroupIndex = useCallback(
    (currentIndex: number) => {
      return stepGroups.findIndex(
        (g) => currentIndex >= g.startIndex && currentIndex <= g.endIndex
      );
    },
    [stepGroups]
  );

  // Ref-based approach: overrides can't read runner.currentIndex (created after),
  // so we track current index via ref and wire goToItem/finishService after.
  const currentIndexRef = useRef(0);

  const goNextGroupFn = useCallback(() => {
    const idx = currentIndexRef.current;
    const groupIdx = stepGroups.findIndex(
      (g) => idx >= g.startIndex && idx <= g.endIndex
    );
    if (groupIdx < stepGroups.length - 1) {
      const nextStart = stepGroups[groupIdx + 1].startIndex;
      currentIndexRef.current = nextStart;
      goToItemRef.current(nextStart);
    } else {
      // At last group — trigger finish
      finishRef.current();
    }
  }, [stepGroups]);

  const goPrevGroupFn = useCallback(() => {
    const idx = currentIndexRef.current;
    const groupIdx = stepGroups.findIndex(
      (g) => idx >= g.startIndex && idx <= g.endIndex
    );
    if (groupIdx > 0) {
      const prevStart = stepGroups[groupIdx - 1].startIndex;
      currentIndexRef.current = prevStart;
      goToItemRef.current(prevStart);
    }
  }, [stepGroups]);

  // Refs for goToItem and finishService to avoid circular deps
  const goToItemRef = useRef<(index: number) => void>(() => {});
  const finishRef = useRef<() => void>(() => {});

  const runner = useServiceRunner(plan.items, {
    onNext: goNextGroupFn,
    onPrev: goPrevGroupFn,
  });

  // Keep refs in sync
  goToItemRef.current = runner.goToItem;
  finishRef.current = runner.finishService;
  currentIndexRef.current = runner.currentIndex;

  // Derive current group index
  const currentGroupIndex = useMemo(
    () => findCurrentGroupIndex(runner.currentIndex),
    [findCurrentGroupIndex, runner.currentIndex]
  );

  useEffect(() => {
    // Check if the plan has any song items
    const hasSongs = plan.items.some((i) => i.type === "song");
    const hasLessons = plan.items.some((i) => i.type === "lesson_block");

    if (hasSongs) {
      fetch("/api/songs")
        .then((r) => r.json())
        .then((data) => setSongs(data.songs ?? []))
        .catch(() => {});
    }
    if (hasLessons) {
      fetch("/api/lessons")
        .then((r) => r.json())
        .then((data) => setLessons(data.lessons ?? []))
        .catch(() => {});
    }
  }, [plan.items]);

  const currentItem = plan.items[runner.currentIndex];

  // Completed group indexes: groups before the current one
  const completedGroupIndexes = useMemo(() => {
    const set = new Set<number>();
    for (let i = 0; i < currentGroupIndex; i++) {
      set.add(i);
    }
    return set;
  }, [currentGroupIndex]);

  // Get cached chapter for current scripture item
  const currentChapter = useMemo(() => {
    if (currentItem?.type !== "scripture") return null;
    const data = currentItem.itemData as ScriptureItemData;
    return chapterCache[data.chapterId] ?? null;
  }, [currentItem, chapterCache]);

  const handleChapterLoaded = useCallback((chapter: BibleChapter) => {
    setChapterCache((prev) => ({ ...prev, [chapter.id]: chapter }));
  }, []);

  // Handle finishing the service
  function handleFinishClick() {
    runner.finishService();
    setShowPostNotes(true);
  }

  async function handleSaveNotes(notes: string) {
    try {
      await fetch(`/api/services/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postServiceNotes: notes,
          status: "completed",
        }),
      });
    } catch {
      // Silently fail for now — notes are nice-to-have
    }
    setShowPostNotes(false);
  }

  function handleSkipNotes() {
    // Still mark as completed even if notes are skipped
    fetch(`/api/services/${plan.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    }).catch(() => {});
    setShowPostNotes(false);
  }

  const isLastGroup = currentGroupIndex >= stepGroups.length - 1;

  // Determine if projection is available for current item
  const canProject = useMemo(() => {
    if (!currentItem) return false;
    switch (currentItem.type) {
      case "song":
      case "scripture":
      case "lesson_block":
        return true;
      case "announcement":
      case "custom": {
        const data = currentItem.itemData as { projectable?: boolean };
        return !!data.projectable;
      }
      default:
        return false;
    }
  }, [currentItem]);

  if (!currentItem) {
    return (
      <div className="flex items-center justify-center h-screen text-[var(--color-text-tertiary)]">
        <p className="text-xl">No items in this service plan.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Timeline sidebar */}
      <RunnerTimeline
        groups={stepGroups}
        currentGroupIndex={currentGroupIndex}
        completedGroupIndexes={completedGroupIndexes}
        onSelectGroup={(groupIdx) => runner.goToItem(stepGroups[groupIdx].startIndex)}
        collapsed={timelineCollapsed}
        onToggleCollapse={() => setTimelineCollapsed((prev) => !prev)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[var(--color-text-primary)] truncate">
              {plan.name}
            </h1>
            {plan.communityName && (
              <p className="text-sm text-[var(--color-text-tertiary)]">
                {plan.communityName}
                {plan.roomName && ` — ${plan.roomName}`}
              </p>
            )}
          </div>
          <div className="text-sm text-[var(--color-text-tertiary)]">
            {currentItem.title}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <RunnerContentArea
            item={currentItem}
            player={player}
            chapter={currentChapter}
            onChapterLoaded={handleChapterLoaded}
            songs={songs}
            lessons={lessons}
            prayerRequests={prayerRequests}
            onProjectLyrics={runner.toggleProjection}
            planItems={plan.items}
          />
        </div>

        {/* Bottom navigation bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
          {/* Previous */}
          <Button
            variant="outline"
            onClick={runner.goPrev}
            disabled={currentGroupIndex <= 0}
            className="h-[72px] w-[72px] p-0"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          {/* Center: position + project */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">
              {currentGroupIndex + 1} of {stepGroups.length}
            </span>

            {canProject && (
              <Button
                variant={runner.isProjecting ? "default" : "outline"}
                onClick={runner.toggleProjection}
                className={cn(
                  "h-14 gap-2 px-6 text-base font-semibold",
                  runner.isProjecting && "bg-[var(--color-primary)]"
                )}
                aria-label={runner.isProjecting ? "Stop projecting" : "Start projecting"}
              >
                <Monitor className="w-5 h-5" />
                {runner.isProjecting ? "Stop Projecting" : "Project"}
              </Button>
            )}
          </div>

          {/* Next / Finish */}
          {isLastGroup ? (
            <Button
              onClick={handleFinishClick}
              className="h-[72px] px-6 gap-2 text-lg font-bold bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white"
              aria-label="Finish service"
            >
              <CheckCircle className="w-7 h-7" />
              Finish
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={runner.goNext}
              className="h-[72px] w-[72px] p-0"
              aria-label="Next item"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}
        </div>
      </div>

      {/* Projection overlay */}
      {runner.isProjecting && (
        <RunnerProjectionBridge
          item={currentItem}
          chapter={currentChapter}
          onClose={runner.closeProjection}
          songs={songs}
          lessons={lessons}
        />
      )}

      {/* Post-service notes dialog */}
      <PostServiceNotes
        open={showPostNotes}
        onClose={handleSkipNotes}
        onSave={handleSaveNotes}
      />
    </div>
  );
}
