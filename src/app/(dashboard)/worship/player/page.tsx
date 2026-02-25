"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ListMusic, FileText, Music } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { MusicPlayer } from "@/components/worship/MusicPlayer";
import { LyricsDisplay } from "@/components/worship/LyricsDisplay";
import { LyricsProjection } from "@/components/worship/LyricsProjection";
import { PlaylistBuilder } from "@/components/worship/PlaylistBuilder";
import { SheetMusicView } from "@/components/worship/SheetMusicView";
import { cn } from "@/lib/utils/cn";
import type { Song } from "@/lib/types";

type ViewMode = "lyrics" | "playlist" | "sheet-music";

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[var(--color-bg-primary)] z-[100]" />}>
      <PlayerContent />
    </Suspense>
  );
}

function PlayerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const songId = searchParams.get("song");
  const player = useAudioPlayer();
  const [viewMode, setViewMode] = useState<ViewMode>("lyrics");
  const [showProjection, setShowProjection] = useState(false);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [activeLyricSection, setActiveLyricSection] = useState(0);

  // TODO: Fetch songs from API
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("/api/songs");
        if (res.ok) {
          const data = await res.json();
          setAllSongs(data.songs ?? []);
        }
      } catch {
        // API not available yet
      }
    }
    fetchSongs();
  }, []);

  // Load initial song when songId changes and songs are available
  useEffect(() => {
    if (songId && allSongs.length > 0) {
      const song = allSongs.find((s) => s.id === songId);
      if (song) {
        player.loadSong(song);
      }
    } else if (!songId && playlistSongs.length > 0) {
      player.loadPlaylist(playlistSongs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songId, allSongs]);

  const currentLyrics = useMemo(() => {
    return player.currentSong?.lyrics ?? [];
  }, [player.currentSong]);

  const handleProjectLyrics = () => {
    if (player.currentSong) {
      setShowProjection(true);
    }
  };

  // Close projection when song clears
  useEffect(() => {
    if (!player.currentSong) {
      setShowProjection(false);
    }
  }, [player.currentSong]);

  // Empty state when no songs loaded
  if (allSongs.length === 0 && !player.currentSong) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors min-h-[48px]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back to Worship Hub</span>
        </button>
        <div className="text-center py-16 text-[var(--color-text-tertiary)]">
          <Music className="w-16 h-16 mx-auto mb-4 opacity-40" />
          <p className="text-xl font-medium">No songs loaded</p>
          <p className="text-base mt-2">Add songs to the catalog to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors min-h-[48px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back to Worship Hub</span>
      </button>

      {/* Music Player */}
      <MusicPlayer
        player={player}
        onProjectLyrics={handleProjectLyrics}
      />

      {/* View toggle */}
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

      {/* Content area */}
      {viewMode === "lyrics" ? (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <LyricsDisplay
            lyrics={currentLyrics}
            songTitle={player.currentSong?.title}
            activeSection={activeLyricSection}
            onSectionClick={setActiveLyricSection}
          />
        </div>
      ) : viewMode === "playlist" ? (
        <PlaylistBuilder
          songs={playlistSongs}
          availableSongs={allSongs}
          playlistName={playlistName}
          onNameChange={setPlaylistName}
          onReorder={setPlaylistSongs}
          onRemove={(id) =>
            setPlaylistSongs((prev) => prev.filter((s) => s.id !== id))
          }
          onAdd={(song) =>
            setPlaylistSongs((prev) => [...prev, song])
          }
          onSave={() => {
            // TODO: Save playlist to database
          }}
        />
      ) : (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]">
          <SheetMusicView
            sheetMusicUrl={player.currentSong?.sheetMusicUrl ?? null}
            songTitle={player.currentSong?.title}
          />
        </div>
      )}

      {/* Lyrics projection overlay */}
      {showProjection && currentLyrics.length > 0 && (
        <div className="fixed inset-0 z-[100]">
          <LyricsProjection
            lyrics={currentLyrics}
            songTitle={player.currentSong?.title}
            onClose={() => setShowProjection(false)}
          />
        </div>
      )}
    </div>
  );
}
