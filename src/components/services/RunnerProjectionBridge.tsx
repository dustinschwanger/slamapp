"use client";

import { LyricsProjection } from "@/components/worship/LyricsProjection";
import { ScriptureProjection } from "@/components/reading/ScriptureProjection";
import { LessonProjection } from "@/components/reading/LessonProjection";
import { TextProjection } from "./TextProjection";
import { ProjectionErrorBoundary } from "@/components/ui/ProjectionErrorBoundary";
import type { BibleChapter } from "@/lib/bible/types";
import type {
  ServicePlanItem,
  SongItemData,
  ScriptureItemData,
  LessonBlockItemData,
  AnnouncementItemData,
  CustomItemData,
  Song,
  LessonContent,
} from "@/lib/types";

interface LessonWithId extends LessonContent {
  id: string;
}

interface RunnerProjectionBridgeProps {
  item: ServicePlanItem;
  chapter: BibleChapter | null;
  onClose: () => void;
  songs: Song[];
  lessons: LessonWithId[];
}

export function RunnerProjectionBridge({
  item,
  chapter,
  onClose,
  songs,
  lessons,
}: RunnerProjectionBridgeProps) {
  switch (item.type) {
    case "song": {
      const songData = item.itemData as SongItemData;
      const song = songs.find((s) => s.id === songData.songId);
      if (!song) return null;
      return (
        <ProjectionErrorBoundary onClose={onClose}>
          <LyricsProjection
            lyrics={song.lyrics}
            songTitle={song.title}
            onClose={onClose}
          />
        </ProjectionErrorBoundary>
      );
    }

    case "scripture": {
      if (!chapter) return null;
      return (
        <ProjectionErrorBoundary onClose={onClose}>
          <ScriptureProjection chapter={chapter} onClose={onClose} />
        </ProjectionErrorBoundary>
      );
    }

    case "lesson_block": {
      const lessonData = item.itemData as LessonBlockItemData;
      const lesson = lessons.find((l) => l.id === lessonData.lessonId);
      if (!lesson) return null;
      const projectableBlocks = lesson.blocks.filter((b) => b.projectable);
      if (projectableBlocks.length === 0) return null;
      return (
        <ProjectionErrorBoundary onClose={onClose}>
          <LessonProjection
            blocks={lesson.blocks}
            startIndex={lessonData.blockIndex}
            onClose={onClose}
          />
        </ProjectionErrorBoundary>
      );
    }

    case "announcement": {
      const annData = item.itemData as AnnouncementItemData;
      if (!annData.projectable) return null;
      return (
        <ProjectionErrorBoundary onClose={onClose}>
          <TextProjection
            title={item.title}
            content={annData.content}
            onClose={onClose}
          />
        </ProjectionErrorBoundary>
      );
    }

    case "custom": {
      const customData = item.itemData as CustomItemData;
      if (!customData.projectable) return null;
      return (
        <ProjectionErrorBoundary onClose={onClose}>
          <TextProjection
            title={item.title}
            content={customData.content}
            onClose={onClose}
          />
        </ProjectionErrorBoundary>
      );
    }

    case "prayer_time":
    default:
      return null;
  }
}
