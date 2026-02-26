import type { LessonBlockType } from "@/lib/types";

export const BLOCK_TYPE_LABELS: Record<LessonBlockType, string> = {
  opening_prayer: "Opening Prayer",
  context: "Context",
  scripture_reading: "Scripture Reading",
  teaching: "Teaching",
  teacher_notes: "Teacher Notes",
  video: "Video",
  discussion: "Discussion",
  application: "Application",
  closing_prayer: "Closing Prayer",
};

export const BLOCK_DURATIONS: Record<LessonBlockType, number> = {
  opening_prayer: 120,
  context: 180,
  scripture_reading: 120,
  teaching: 300,
  teacher_notes: 0,
  video: 300,
  discussion: 180,
  application: 120,
  closing_prayer: 120,
};
