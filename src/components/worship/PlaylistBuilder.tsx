"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  Save,
  Clock,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import type { Song } from "@/lib/types";

interface PlaylistBuilderProps {
  songs: Song[];
  availableSongs: Song[];
  playlistName: string;
  onNameChange: (name: string) => void;
  onReorder: (songs: Song[]) => void;
  onRemove: (songId: string) => void;
  onAdd: (song: Song) => void;
  onSave: () => void;
  className?: string;
}

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hrs}h ${remainMins}m`;
  }
  return `${mins}m ${secs}s`;
}

export function PlaylistBuilder({
  songs,
  availableSongs,
  playlistName,
  onNameChange,
  onReorder,
  onRemove,
  onAdd,
  onSave,
  className,
}: PlaylistBuilderProps) {
  const [showCatalog, setShowCatalog] = useState(false);

  const totalDuration = songs.reduce((sum, s) => sum + s.audioDuration, 0);
  const songsNotInPlaylist = availableSongs.filter(
    (s) => !songs.find((ps) => ps.id === s.id)
  );

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSongs = [...songs];
    [newSongs[index - 1], newSongs[index]] = [newSongs[index], newSongs[index - 1]];
    onReorder(newSongs);
  };

  const moveDown = (index: number) => {
    if (index === songs.length - 1) return;
    const newSongs = [...songs];
    [newSongs[index], newSongs[index + 1]] = [newSongs[index + 1], newSongs[index]];
    onReorder(newSongs);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)]",
        className
      )}
    >
      {/* Playlist name */}
      <div className="flex items-center gap-3">
        <Input
          value={playlistName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Playlist name..."
          className="flex-1 text-lg font-semibold"
        />
        <Button variant="worship" size="sm" onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>
      </div>

      {/* Total duration */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]">
        <Clock className="w-4 h-4" />
        <span>
          {songs.length} song{songs.length !== 1 ? "s" : ""} &middot;{" "}
          {formatDuration(totalDuration)}
        </span>
      </div>

      {/* Song list */}
      <div className="flex flex-col gap-2">
        {songs.length === 0 && (
          <p className="text-center text-[var(--color-text-tertiary)] py-8">
            No songs in playlist. Add songs to get started.
          </p>
        )}
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="flex items-center gap-2 p-3 bg-[var(--color-bg-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)]"
          >
            <GripVertical className="w-4 h-4 text-[var(--color-text-tertiary)] shrink-0" />
            <span className="text-sm font-medium text-[var(--color-text-tertiary)] w-6 text-center shrink-0">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium text-[var(--color-text-primary)] truncate">
                {song.title}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] truncate">
                {song.author}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label={`Move ${song.title} up`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === songs.length - 1}
                className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label={`Move ${song.title} down`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemove(song.id)}
                className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                aria-label={`Remove ${song.title}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add song button */}
      <Button
        variant="outline"
        onClick={() => setShowCatalog(!showCatalog)}
        className="gap-2"
      >
        <Plus className="w-4 h-4" />
        {showCatalog ? "Hide Song Catalog" : "Add Song"}
      </Button>

      {/* Song catalog for adding */}
      {showCatalog && (
        <div className="flex flex-col gap-2 p-3 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] max-h-64 overflow-y-auto">
          {songsNotInPlaylist.length === 0 ? (
            <p className="text-center text-[var(--color-text-tertiary)] py-4">
              All songs are already in the playlist.
            </p>
          ) : (
            songsNotInPlaylist.map((song) => (
              <button
                key={song.id}
                onClick={() => onAdd(song)}
                className="flex items-center gap-3 p-3 bg-[var(--color-bg-card)] rounded-[var(--radius-sm)] hover:shadow-[var(--shadow-sm)] transition-shadow text-left"
              >
                <Plus className="w-4 h-4 text-[var(--color-worship)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] truncate">
                    {song.author}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
