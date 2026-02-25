"use client";

import { useEffect, useState, useMemo } from "react";
import { Music, FileText, ListMusic } from "lucide-react";
import { MusicPlayer } from "@/components/worship/MusicPlayer";
import { LyricsDisplay } from "@/components/worship/LyricsDisplay";
import { SheetMusicView } from "@/components/worship/SheetMusicView";
import { cn } from "@/lib/utils/cn";
import type { ServicePlanItem, SongItemData, Song } from "@/lib/types";
import type { AudioPlayerState, AudioPlayerActions } from "@/hooks/useAudioPlayer";

type SongViewMode = "lyrics" | "playlist" | "sheet-music";

interface RunnerSongContentProps {
  item: ServicePlanItem;
  player: AudioPlayerState & AudioPlayerActions;
  songs: Song[];
  onProjectLyrics: () => void;
  planItems: ServicePlanItem[];
}

export function RunnerSongContent({
  item,
  player,
  songs,
  onProjectLyrics,
  planItems,
}: RunnerSongContentProps) {
  const itemData = item.itemData as SongItemData;
  const song = songs.find((s) => s.id === itemData.songId);
  const [viewMode, setViewMode] = useState<SongViewMode>("lyrics");

  useEffect(() => {
    if (song) {
      player.loadSong(song);
    }
    // Only reload when the song changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData.songId]);

  // Build a read-only list of all songs in the service plan
  const planSongs = useMemo(() => {
    return planItems
      .filter((pi) => pi.type === "song")
      .map((pi) => {
        const data = pi.itemData as SongItemData;
        const matched = songs.find((s) => s.id === data.songId);
        return {
          id: data.songId,
          title: matched?.title ?? pi.title,
          author: matched?.author ?? "",
          isCurrent: data.songId === itemData.songId,
        };
      });
  }, [planItems, songs, itemData.songId]);

  if (!song) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-tertiary)]">
        <Music className="w-12 h-12" />
        <p className="text-xl">Song not found</p>
        <p className="text-sm">The song referenced by this item could not be located.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <MusicPlayer player={player} onProjectLyrics={onProjectLyrics} />

      {/* Tab bar */}
      <div className="flex gap-2 p-1 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]">
        <button
          onClick={() => setViewMode("lyrics")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] font-medium text-base transition-colors",
            viewMode === "lyrics"
              ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
              : "text-[var(--color-text-secondary)]"
          )}
        >
          <FileText className="w-4 h-4" />
          Lyrics
        </button>
        <button
          onClick={() => setViewMode("playlist")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] font-medium text-base transition-colors",
            viewMode === "playlist"
              ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
              : "text-[var(--color-text-secondary)]"
          )}
        >
          <ListMusic className="w-4 h-4" />
          Playlist
        </button>
        <button
          onClick={() => setViewMode("sheet-music")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] font-medium text-base transition-colors",
            viewMode === "sheet-music"
              ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
              : "text-[var(--color-text-secondary)]"
          )}
        >
          <Music className="w-4 h-4" />
          Sheet Music
        </button>
      </div>

      {/* Tab content */}
      {viewMode === "lyrics" ? (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <LyricsDisplay lyrics={song.lyrics} songTitle={song.title} />
        </div>
      ) : viewMode === "playlist" ? (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] p-4">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
            Service Songs
          </h3>
          {planSongs.length === 0 ? (
            <p className="text-[var(--color-text-tertiary)] text-center py-4">
              No songs in this service.
            </p>
          ) : (
            <ul className="space-y-2">
              {planSongs.map((ps, idx) => (
                <li
                  key={ps.id + "-" + idx}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-colors",
                    ps.isCurrent
                      ? "bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30"
                      : "bg-[var(--color-bg-surface)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold shrink-0",
                      ps.isCurrent
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-base font-medium truncate",
                        ps.isCurrent
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-text-primary)]"
                      )}
                    >
                      {ps.title}
                    </p>
                    {ps.author && (
                      <p className="text-sm text-[var(--color-text-tertiary)] truncate">
                        {ps.author}
                      </p>
                    )}
                  </div>
                  {ps.isCurrent && (
                    <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wide shrink-0">
                      Now Playing
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <SheetMusicView
            sheetMusicUrl={song.sheetMusicUrl}
            songTitle={song.title}
          />
        </div>
      )}
    </div>
  );
}
