"use client";

import { useState } from "react";
import { Music, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ServicePlanItem, Song } from "@/lib/types";

interface AddSongPanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
  songs: Song[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AddSongPanel({ onAddItem, songs }: AddSongPanelProps) {
  const [search, setSearch] = useState("");

  const filteredSongs = songs.filter((song) => {
    const q = search.toLowerCase();
    return (
      song.title.toLowerCase().includes(q) ||
      song.author.toLowerCase().includes(q) ||
      song.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-tertiary)]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search songs by title, author, or tag..."
          className="pl-10"
        />
      </div>

      {/* Song list */}
      <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
        {filteredSongs.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-text-tertiary)] py-6">
            No songs match your search.
          </p>
        ) : (
          filteredSongs.map((song) => (
            <button
              key={song.id}
              onClick={() =>
                onAddItem({
                  type: "song",
                  title: song.title,
                  estimatedDurationSeconds: song.audioDuration,
                  itemData: { songId: song.id },
                })
              }
              className="flex items-center gap-3 p-3 min-h-[48px] bg-[var(--color-bg-card)] rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:shadow-[var(--shadow-sm)] hover:border-[var(--color-worship)] transition-all text-left"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--color-worship)]/10 shrink-0">
                <Music className="w-4 h-4 text-[var(--color-worship)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-[var(--color-text-primary)] truncate">
                  {song.title}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] truncate">
                  {song.author}
                </p>
              </div>
              <span className="text-sm text-[var(--color-text-tertiary)] shrink-0">
                {formatDuration(song.audioDuration)}
              </span>
              <Plus className="w-4 h-4 text-[var(--color-worship)] shrink-0" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
