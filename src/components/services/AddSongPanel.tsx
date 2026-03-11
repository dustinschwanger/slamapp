"use client";

import { useMemo, useState } from "react";
import { Music, Plus, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import type { ServicePlanItem, Song } from "@/lib/types";

interface AddSongPanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
  songs: Song[];
  existingItems?: ServicePlanItem[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AddSongPanel({ onAddItem, songs, existingItems = [] }: AddSongPanelProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract unique tags from all songs
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const song of songs) {
      for (const tag of song.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet).sort();
  }, [songs]);

  // Set of song IDs already in the timeline
  const addedSongIds = useMemo(() => {
    const ids = new Set<string>();
    for (const item of existingItems) {
      if (item.type === "song" && "songId" in item.itemData) {
        ids.add(item.itemData.songId);
      }
    }
    return ids;
  }, [existingItems]);

  const filteredSongs = songs.filter((song) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      song.title.toLowerCase().includes(q) ||
      song.author.toLowerCase().includes(q) ||
      song.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchesTag = !activeTag || song.tags.includes(activeTag);
    return matchesSearch && matchesTag;
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

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                activeTag === tag
                  ? "bg-[var(--color-worship)] text-white border-[var(--color-worship)]"
                  : "bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-worship)]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Song list */}
      <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto">
        {filteredSongs.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-text-tertiary)] py-6">
            No songs match your search.
          </p>
        ) : (
          filteredSongs.map((song) => {
            const isAdded = addedSongIds.has(song.id);

            return (
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
                className={cn(
                  "flex items-center gap-3 p-3 min-h-[48px] bg-[var(--color-bg-card)] rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:shadow-[var(--shadow-sm)] hover:border-[var(--color-worship)] transition-all text-left",
                  isAdded && "opacity-50"
                )}
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
                {isAdded ? (
                  <Check className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-[var(--color-worship)] shrink-0" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
