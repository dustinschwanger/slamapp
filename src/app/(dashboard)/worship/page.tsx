"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SongCard } from "@/components/worship/SongCard";
import { AddToServiceDialog } from "@/components/services/AddToServiceDialog";
import { useAddToService } from "@/hooks/useAddToService";
import { cn } from "@/lib/utils/cn";
import type { Song } from "@/lib/types";

export default function WorshipPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [songs, setSongs] = useState<Song[]>([]);
  const [tags, setTags] = useState<string[]>(["all"]);
  const addToService = useAddToService();

  // TODO: Fetch songs from API
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("/api/songs");
        if (res.ok) {
          const data = await res.json();
          setSongs(data.songs ?? []);
          // Derive tags from fetched songs
          const allTags = new Set<string>();
          (data.songs ?? []).forEach((s: Song) => s.tags.forEach((t) => allTags.add(t)));
          setTags(["all", ...Array.from(allTags).sort()]);
        }
      } catch {
        // API not available yet
      }
    }
    fetchSongs();
  }, []);

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        !searchQuery ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        activeTag === "all" || song.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [songs, searchQuery, activeTag]);

  const handlePlaySong = (songId: string) => {
    router.push(`/worship/player?song=${songId}`);
  };

  const handleViewSong = (songId: string) => {
    router.push(`/worship/player?song=${songId}`);
  };

  const handleAddSongToService = (song: Song) => {
    addToService.openDialog({
      type: "song",
      title: song.title,
      estimatedDurationSeconds: song.audioDuration || 180,
      itemData: { songId: song.id },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-worship)] text-[var(--color-worship-foreground)]">
          <Music className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Worship Hub
          </h1>
          <p className="text-base text-[var(--color-text-secondary)]">
            Song catalog, playlists, and lyrics projection
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs by title or author..."
          className="h-12 pl-12 text-lg"
        />
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-[var(--duration-normal)] capitalize",
              activeTag === tag
                ? "bg-[var(--color-worship)] text-[var(--color-worship-foreground)]"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Song Catalog */}
      <section>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
          Song Catalog
          <span className="text-base font-normal text-[var(--color-text-tertiary)] ml-2">
            ({filteredSongs.length} songs)
          </span>
        </h2>
        <div className="flex flex-col gap-3">
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-tertiary)]">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg">
                {songs.length === 0 ? "No songs yet" : "No songs found"}
              </p>
              <p className="text-sm">
                {songs.length === 0
                  ? "Songs will appear here once added"
                  : "Try a different search or filter"}
              </p>
            </div>
          ) : (
            filteredSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={(s) => handlePlaySong(s.id)}
                onClick={(s) => handleViewSong(s.id)}
                onAddToService={handleAddSongToService}
              />
            ))
          )}
        </div>
      </section>

      <AddToServiceDialog
        isOpen={addToService.isOpen}
        onClose={addToService.closeDialog}
        plans={addToService.plans}
        plansLoading={addToService.plansLoading}
        isSubmitting={addToService.isSubmitting}
        onSelectPlan={addToService.addToPlan}
        itemCount={addToService.pendingItemCount}
        itemLabel={addToService.pendingItemCount === 1 ? "song" : "songs"}
      />
    </div>
  );
}
