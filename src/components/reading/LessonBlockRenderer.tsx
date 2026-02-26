"use client";

import {
  BookOpen,
  MessageCircle,
  Lightbulb,
  Monitor,
  ClipboardList,
  ScrollText,
  Video,
  HandHeart,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { getEmbedUrl } from "@/lib/utils/video";
import type { LessonBlock, LessonBlockType } from "@/lib/types";

export const blockLabels: Record<LessonBlockType, string> = {
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

function BlockIcon({ type }: { type: LessonBlockType }) {
  switch (type) {
    case "opening_prayer":
    case "closing_prayer":
      return <HandHeart className="h-5 w-5" />;
    case "context":
      return <ScrollText className="h-5 w-5" />;
    case "scripture_reading":
      return <BookOpen className="h-5 w-5" />;
    case "teacher_notes":
      return <NotebookPen className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "discussion":
      return <MessageCircle className="h-5 w-5" />;
    case "application":
      return <Lightbulb className="h-5 w-5" />;
    default:
      return null;
  }
}

interface LessonBlockRendererProps {
  block: LessonBlock;
  index: number;
  onProject?: (block: LessonBlock, index: number) => void;
  onAddToService?: (block: LessonBlock, index: number) => void;
}

export function LessonBlockRenderer({
  block,
  index,
  onProject,
  onAddToService,
}: LessonBlockRendererProps) {
  const isScripture = block.type === "scripture_reading";
  const isDiscussion = block.type === "discussion";
  const isApplication = block.type === "application";
  const isPrayer = block.type === "opening_prayer" || block.type === "closing_prayer";
  const isTeacherNotes = block.type === "teacher_notes";
  const isVideo = block.type === "video";
  const embedUrl = isVideo && block.videoUrl ? getEmbedUrl(block.videoUrl) : null;

  return (
    <div
      className={cn(
        "mb-6 rounded-[var(--radius-md)] p-5",
        isApplication && "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30",
        isScripture && "bg-bg-secondary border-l-4 border-l-primary",
        isPrayer && "bg-[var(--color-prayer)]/8 border-l-4 border-l-[var(--color-prayer)]",
        isTeacherNotes && "bg-amber-50 border-2 border-dashed border-amber-300",
        isDiscussion && "bg-bg-secondary",
        isVideo && "bg-bg-secondary",
        !isApplication && !isScripture && !isDiscussion && !isPrayer && !isTeacherNotes && !isVideo && "bg-transparent"
      )}
    >
      {/* Block header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BlockIcon type={block.type} />
          <span className="text-sm font-semibold uppercase tracking-wide text-text-tertiary">
            {blockLabels[block.type]}
          </span>
          {isTeacherNotes && (
            <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-300">
              For the Teacher
            </Badge>
          )}
          {isScripture && block.reference && (
            <Badge variant="secondary" className="ml-2">
              {block.reference}
              {block.version && ` (${block.version})`}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onAddToService && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToService(block, index)}
              className="gap-1 text-text-tertiary hover:text-primary"
              aria-label={`Add ${blockLabels[block.type]} to service plan`}
            >
              <ClipboardList className="h-4 w-4" />
              Add to Service
            </Button>
          )}
          {block.projectable && !isTeacherNotes && onProject && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onProject(block, index)}
              className="gap-1 text-text-tertiary hover:text-primary"
              aria-label={`Project ${blockLabels[block.type]}`}
            >
              <Monitor className="h-4 w-4" />
              Project
            </Button>
          )}
        </div>
      </div>

      {/* Video embed */}
      {isVideo && embedUrl && (
        <div className="rounded-[var(--radius-md)] overflow-hidden border border-border aspect-video mb-4">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Lesson video"
          />
        </div>
      )}

      {/* Block content */}
      {block.content && (
        <div
          className="prose prose-base max-w-none font-reading leading-relaxed text-lg text-text-primary"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      )}
    </div>
  );
}
