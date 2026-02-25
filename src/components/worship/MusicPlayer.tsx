"use client";

import { useCallback, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { AudioPlayerState, AudioPlayerActions } from "@/hooks/useAudioPlayer";

interface MusicPlayerProps {
  player: AudioPlayerState & AudioPlayerActions;
  onProjectLyrics?: () => void;
  className?: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function MusicPlayer({
  player,
  onProjectLyrics,
  className,
}: MusicPlayerProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || !player.duration) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      player.seek(ratio * player.duration);
    },
    [player]
  );

  const handleVolumeClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!volumeBarRef.current) return;
      const rect = volumeBarRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      player.setVolume(ratio);
    },
    [player]
  );

  const progressPercent = player.duration > 0
    ? (player.progress / player.duration) * 100
    : 0;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 p-6 bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)]",
        className
      )}
    >
      {/* Song Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {player.currentSong?.title ?? "No Song Selected"}
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mt-1">
          {player.currentSong?.author ?? "Select a song to begin"}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div
          ref={progressBarRef}
          role="slider"
          aria-label="Song progress"
          aria-valuemin={0}
          aria-valuemax={player.duration}
          aria-valuenow={player.progress}
          tabIndex={0}
          onClick={handleProgressClick}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              player.seek(Math.min(player.progress + 5, player.duration));
            } else if (e.key === "ArrowLeft") {
              player.seek(Math.max(player.progress - 5, 0));
            }
          }}
          className="relative w-full h-2 bg-[var(--color-bg-secondary)] rounded-full cursor-pointer group"
        >
          <div
            className="absolute top-0 left-0 h-full bg-[var(--color-worship)] rounded-full transition-[width] duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-worship)] rounded-full shadow-[var(--shadow-sm)] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-sm text-[var(--color-text-tertiary)]">
          <span>{formatTime(player.progress)}</span>
          <span>-{formatTime(Math.max(0, player.duration - player.progress))}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={player.previous}
          disabled={player.currentIndex <= 0}
          className="flex items-center justify-center w-12 h-12 rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous song"
        >
          <SkipBack className="w-6 h-6" fill="currentColor" />
        </button>

        <button
          onClick={player.toggle}
          disabled={!player.currentSong}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-worship)] text-[var(--color-worship-foreground)] hover:bg-[var(--color-worship-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[var(--shadow-md)]"
          aria-label={player.isPlaying ? "Pause" : "Play"}
        >
          {player.isPlaying ? (
            <Pause className="w-7 h-7" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          )}
        </button>

        <button
          onClick={player.next}
          disabled={player.currentIndex >= player.playlist.length - 1}
          className="flex items-center justify-center w-12 h-12 rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next song"
        >
          <SkipForward className="w-6 h-6" fill="currentColor" />
        </button>
      </div>

      {/* Volume + Project Lyrics */}
      <div className="flex items-center gap-4 w-full">
        <Volume2 className="w-5 h-5 text-[var(--color-text-tertiary)] shrink-0" />
        <div
          ref={volumeBarRef}
          role="slider"
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(player.volume * 100)}
          tabIndex={0}
          onClick={handleVolumeClick}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              player.setVolume(player.volume + 0.05);
            } else if (e.key === "ArrowLeft") {
              player.setVolume(player.volume - 0.05);
            }
          }}
          className="relative flex-1 h-2 bg-[var(--color-bg-secondary)] rounded-full cursor-pointer"
        >
          <div
            className="absolute top-0 left-0 h-full bg-[var(--color-text-tertiary)] rounded-full"
            style={{ width: `${player.volume * 100}%` }}
          />
        </div>

        {onProjectLyrics && (
          <Button
            variant="worship"
            size="sm"
            onClick={onProjectLyrics}
            className="ml-auto gap-2"
          >
            <Monitor className="w-4 h-4" />
            Project Lyrics
          </Button>
        )}
      </div>

      {/* Error display */}
      {player.error && (
        <p className="text-sm text-[var(--color-error)]">{player.error}</p>
      )}
    </div>
  );
}
