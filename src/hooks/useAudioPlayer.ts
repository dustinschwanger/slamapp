"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Howl } from "howler";
import type { Song } from "@/lib/types";

export interface AudioPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  duration: number;
  volume: number;
  playlist: Song[];
  currentIndex: number;
  error: string | null;
}

export interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  loadPlaylist: (songs: Song[], startIndex?: number) => void;
  loadSong: (song: Song) => void;
}

export function useAudioPlayer(): AudioPlayerState & AudioPlayerActions {
  const [state, setState] = useState<AudioPlayerState>({
    currentSong: null,
    isPlaying: false,
    isLoading: false,
    progress: 0,
    duration: 0,
    volume: 0.8,
    playlist: [],
    currentIndex: -1,
    error: null,
  });

  const howlRef = useRef<Howl | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressTracking = useCallback(() => {
    clearProgressInterval();
    progressIntervalRef.current = setInterval(() => {
      if (howlRef.current && howlRef.current.playing()) {
        const seek = howlRef.current.seek() as number;
        setState((prev) => ({ ...prev, progress: seek }));
      }
    }, 250);
  }, [clearProgressInterval]);

  const destroyHowl = useCallback(() => {
    clearProgressInterval();
    if (howlRef.current) {
      howlRef.current.unload();
      howlRef.current = null;
    }
  }, [clearProgressInterval]);

  const loadAndPlay = useCallback(
    (song: Song, autoplay: boolean = true) => {
      destroyHowl();

      // If no audio URL, simulate with the song's duration metadata
      if (!song.audioUrl) {
        setState((prev) => ({
          ...prev,
          currentSong: song,
          isPlaying: false,
          isLoading: false,
          progress: 0,
          duration: song.audioDuration,
          error: null,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        currentSong: song,
        isLoading: true,
        progress: 0,
        error: null,
      }));

      const howl = new Howl({
        src: [song.audioUrl],
        html5: true,
        volume: stateRef.current.volume,
        onload: () => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            duration: howl.duration(),
          }));
          if (autoplay) {
            howl.play();
          }
        },
        onplay: () => {
          setState((prev) => ({ ...prev, isPlaying: true }));
          startProgressTracking();
        },
        onpause: () => {
          setState((prev) => ({ ...prev, isPlaying: false }));
          clearProgressInterval();
        },
        onstop: () => {
          setState((prev) => ({ ...prev, isPlaying: false, progress: 0 }));
          clearProgressInterval();
        },
        onend: () => {
          setState((prev) => ({ ...prev, isPlaying: false, progress: 0 }));
          clearProgressInterval();
          // Auto-advance to next song
          const current = stateRef.current;
          if (current.currentIndex < current.playlist.length - 1) {
            const nextIndex = current.currentIndex + 1;
            const nextSong = current.playlist[nextIndex];
            setState((prev) => ({ ...prev, currentIndex: nextIndex }));
            loadAndPlay(nextSong, true);
          }
        },
        onloaderror: (_id: number, error: unknown) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: `Failed to load audio: ${String(error)}`,
          }));
        },
      });

      howlRef.current = howl;
    },
    [destroyHowl, startProgressTracking, clearProgressInterval]
  );

  const play = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (!howlRef.current) return;
    if (state.isPlaying) {
      howlRef.current.pause();
    } else {
      howlRef.current.play();
    }
  }, [state.isPlaying]);

  const next = useCallback(() => {
    const { playlist, currentIndex } = stateRef.current;
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setState((prev) => ({ ...prev, currentIndex: nextIndex }));
      loadAndPlay(playlist[nextIndex], true);
    }
  }, [loadAndPlay]);

  const previous = useCallback(() => {
    const { playlist, currentIndex } = stateRef.current;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setState((prev) => ({ ...prev, currentIndex: prevIndex }));
      loadAndPlay(playlist[prevIndex], true);
    }
  }, [loadAndPlay]);

  const seek = useCallback((position: number) => {
    if (howlRef.current) {
      howlRef.current.seek(position);
      setState((prev) => ({ ...prev, progress: position }));
    } else {
      // For songs without audio, just update progress
      setState((prev) => ({ ...prev, progress: position }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    setState((prev) => ({ ...prev, volume: clamped }));
    if (howlRef.current) {
      howlRef.current.volume(clamped);
    }
  }, []);

  const loadPlaylist = useCallback(
    (songs: Song[], startIndex: number = 0) => {
      setState((prev) => ({
        ...prev,
        playlist: songs,
        currentIndex: startIndex,
      }));
      if (songs.length > 0 && startIndex < songs.length) {
        loadAndPlay(songs[startIndex], false);
      }
    },
    [loadAndPlay]
  );

  const loadSong = useCallback(
    (song: Song) => {
      const { playlist } = stateRef.current;
      const existingIndex = playlist.findIndex((s) => s.id === song.id);
      if (existingIndex >= 0) {
        setState((prev) => ({ ...prev, currentIndex: existingIndex }));
      } else {
        setState((prev) => ({
          ...prev,
          playlist: [...prev.playlist, song],
          currentIndex: prev.playlist.length,
        }));
      }
      loadAndPlay(song, false);
    },
    [loadAndPlay]
  );

  useEffect(() => {
    return () => {
      destroyHowl();
    };
  }, [destroyHowl]);

  return {
    ...state,
    play,
    pause,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    loadPlaylist,
    loadSong,
  };
}
