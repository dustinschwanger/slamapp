"use client";

import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AudioPlayerState, AudioPlayerActions } from "@/hooks/useAudioPlayer";

interface MiniPlayerProps {
  player: AudioPlayerState & AudioPlayerActions;
  onExpand?: () => void;
  className?: string;
}

export function MiniPlayer({ player, onExpand, className }: MiniPlayerProps) {
  if (!player.currentSong) return null;

  const progressPercent =
    player.duration > 0 ? (player.progress / player.duration) * 100 : 0;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:left-[72px] lg:left-[240px]",
        className
      )}
    >
      {/* Thin progress bar at top */}
      <div className="w-full h-0.5 bg-[var(--color-bg-secondary)]">
        <div
          className="h-full bg-[var(--color-worship)] transition-[width] duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Player bar */}
      <div className="flex items-center h-[72px] px-4 bg-[var(--color-bg-card)] border-t border-[var(--color-border)] shadow-[var(--shadow-lg)]">
        {/* Song info - tap to expand */}
        <button
          onClick={onExpand}
          className="flex-1 min-w-0 text-left"
          aria-label="Open full player"
        >
          <p className="text-base font-semibold text-[var(--color-text-primary)] truncate">
            {player.currentSong.title}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] truncate">
            {player.currentSong.author}
          </p>
        </button>

        {/* Play/Pause */}
        <button
          onClick={player.toggle}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-worship)] text-[var(--color-worship-foreground)] hover:bg-[var(--color-worship-hover)] transition-colors shrink-0 ml-3"
          aria-label={player.isPlaying ? "Pause" : "Play"}
        >
          {player.isPlaying ? (
            <Pause className="w-5 h-5" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
}
