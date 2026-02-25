"use client";

import { RunnerSongContent } from "./RunnerSongContent";
import { RunnerScriptureContent } from "./RunnerScriptureContent";
import { RunnerLessonContent } from "./RunnerLessonContent";
import { RunnerPrayerContent } from "./RunnerPrayerContent";
import { RunnerCustomContent } from "./RunnerCustomContent";
import type { ServicePlanItem, Song, LessonContent, PrayerRequest } from "@/lib/types";
import type { AudioPlayerState, AudioPlayerActions } from "@/hooks/useAudioPlayer";
import type { BibleChapter } from "@/lib/bible/types";

interface LessonWithId extends LessonContent {
  id: string;
}

interface RunnerContentAreaProps {
  item: ServicePlanItem;
  player: AudioPlayerState & AudioPlayerActions;
  chapter: BibleChapter | null;
  onChapterLoaded: (chapter: BibleChapter) => void;
  songs: Song[];
  lessons: LessonWithId[];
  prayerRequests: PrayerRequest[];
  onProjectLyrics: () => void;
  planItems: ServicePlanItem[];
}

export function RunnerContentArea({
  item,
  player,
  chapter,
  onChapterLoaded,
  songs,
  lessons,
  prayerRequests,
  onProjectLyrics,
  planItems,
}: RunnerContentAreaProps) {
  switch (item.type) {
    case "song":
      return (
        <RunnerSongContent
          item={item}
          player={player}
          songs={songs}
          onProjectLyrics={onProjectLyrics}
          planItems={planItems}
        />
      );
    case "scripture":
      return (
        <RunnerScriptureContent
          item={item}
          chapter={chapter}
          onChapterLoaded={onChapterLoaded}
        />
      );
    case "lesson_block":
      return <RunnerLessonContent item={item} lessons={lessons} />;
    case "prayer_time":
      return <RunnerPrayerContent item={item} prayerRequests={prayerRequests} />;
    case "announcement":
    case "custom":
      return <RunnerCustomContent item={item} />;
    default:
      return (
        <div className="flex items-center justify-center h-full text-[var(--color-text-tertiary)]">
          <p className="text-xl">Unknown item type</p>
        </div>
      );
  }
}
