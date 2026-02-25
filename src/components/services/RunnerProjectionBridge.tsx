"use client";

import { LyricsProjection } from "@/components/worship/LyricsProjection";
import { ScriptureProjection } from "@/components/reading/ScriptureProjection";
import { LessonProjection } from "@/components/reading/LessonProjection";
import { TextProjection } from "./TextProjection";
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
        <LyricsProjection
          lyrics={song.lyrics}
          songTitle={song.title}
          onClose={onClose}
        />
      );
    }

    case "scripture": {
      if (!chapter) return null;
      return <ScriptureProjection chapter={chapter} onClose={onClose} />;
    }

    case "lesson_block": {
      const lessonData = item.itemData as LessonBlockItemData;
      const lesson = lessons.find((l) => l.id === lessonData.lessonId);
      if (!lesson) return null;
      const projectableBlocks = lesson.blocks.filter((b) => b.projectable);
      if (projectableBlocks.length === 0) return null;
      return (
        <LessonProjection
          blocks={lesson.blocks}
          startIndex={lessonData.blockIndex}
          onClose={onClose}
        />
      );
    }

    case "announcement": {
      const annData = item.itemData as AnnouncementItemData;
      if (!annData.projectable) return null;
      return (
        <TextProjection
          title={item.title}
          content={annData.content}
          onClose={onClose}
        />
      );
    }

    case "custom": {
      const customData = item.itemData as CustomItemData;
      if (!customData.projectable) return null;
      return (
        <TextProjection
          title={item.title}
          content={customData.content}
          onClose={onClose}
        />
      );
    }

    case "prayer_time":
    default:
      return null;
  }
}
