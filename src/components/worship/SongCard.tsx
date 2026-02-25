"use client";

import { Play, FileMusic, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { Song } from "@/lib/types";

interface SongCardProps {
  song: Song;
  onPlay?: (song: Song) => void;
  onClick?: (song: Song) => void;
  onAddToService?: (song: Song) => void;
  className?: string;
}

export function SongCard({ song, onPlay, onClick, onAddToService, className }: SongCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(song)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(song);
        }
      }}
      className={cn(
        "flex items-center gap-4 p-4 bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 border-l-[var(--color-worship)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-[var(--duration-normal)] cursor-pointer",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] truncate">
          {song.title}
        </h3>
        <p className="text-[16px] text-[var(--color-text-secondary)] truncate">
          {song.author}
          {song.yearWritten ? ` (${song.yearWritten})` : ""}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {song.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5"
            >
              {tag}
            </Badge>
          ))}
          {song.sheetMusicUrl && (
            <FileMusic className="w-4 h-4 text-[var(--color-text-tertiary)]" aria-label="Sheet music available" />
          )}
        </div>
      </div>

      {onAddToService && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToService(song);
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-primary)] transition-colors duration-[var(--duration-normal)] shrink-0 focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
          aria-label={`Add ${song.title} to service plan`}
        >
          <ClipboardList className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPlay?.(song);
        }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-worship)] text-[var(--color-worship-foreground)] hover:bg-[var(--color-worship-hover)] transition-colors duration-[var(--duration-normal)] shrink-0"
        aria-label={`Play ${song.title}`}
      >
        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
      </button>
    </div>
  );
}
