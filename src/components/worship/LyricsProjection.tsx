"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SongLyricSection } from "@/lib/types";

interface LyricsProjectionProps {
  lyrics: SongLyricSection[];
  songTitle?: string;
  className?: string;
  onClose?: () => void;
}

function sectionLabel(section: SongLyricSection): string {
  if (section.sectionType === "chorus") return "Chorus";
  if (section.sectionType === "bridge") return "Bridge";
  if (section.sectionType === "tag") return "Tag";
  return `Verse ${section.sectionNumber}`;
}

export function LyricsProjection({
  lyrics,
  songTitle,
  className,
  onClose,
}: LyricsProjectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sorted = [...lyrics].sort((a, b) => a.displayOrder - b.displayOrder);

  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [resetHideTimer]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, sorted.length - 1));
    resetHideTimer();
  }, [sorted.length, resetHideTimer]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    resetHideTimer();
  }, [resetHideTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Enter fullscreen on mount
  useEffect(() => {
    const el = containerRef.current;
    if (el && el.requestFullscreen && !document.fullscreenElement) {
      el.requestFullscreen().catch(() => {
        // Fullscreen may be blocked by browser
      });
    }
  }, []);

  const currentSection = sorted[currentIndex];

  if (sorted.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]">
        <p className="text-2xl">No lyrics available</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={resetHideTimer}
      className={cn(
        "projection-mode relative flex flex-col items-center justify-center min-h-screen select-none",
        className
      )}
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={cn(
            "absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full text-[var(--color-text-on-dark)] hover:bg-white/10 transition-all duration-[var(--duration-slow)]",
            controlsVisible ? "opacity-80" : "opacity-0"
          )}
          aria-label="Close projection"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Song title at top */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 p-6 text-center transition-opacity duration-[var(--duration-slow)]",
          controlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {songTitle && (
          <h1 className="projection-accent font-display text-3xl md:text-4xl font-bold">
            {songTitle}
          </h1>
        )}
        <p className="text-[var(--color-lyric-inactive)] text-lg mt-1">
          {sectionLabel(currentSection)}
        </p>
      </div>

      {/* Lyrics centered */}
      <div className="flex items-center justify-center flex-1 px-8 md:px-16 py-24 w-full max-w-5xl mx-auto">
        <p className="projection-lyrics text-center text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed whitespace-pre-line">
          {currentSection.lyrics}
        </p>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        disabled={currentIndex === 0}
        className={cn(
          "absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-[72px] h-[72px] rounded-full text-[var(--color-text-on-dark)] hover:bg-white/10 transition-all duration-[var(--duration-slow)] disabled:opacity-20",
          controlsVisible ? "opacity-80" : "opacity-0"
        )}
        aria-label="Previous section"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        disabled={currentIndex === sorted.length - 1}
        className={cn(
          "absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-[72px] h-[72px] rounded-full text-[var(--color-text-on-dark)] hover:bg-white/10 transition-all duration-[var(--duration-slow)] disabled:opacity-20",
          controlsVisible ? "opacity-80" : "opacity-0"
        )}
        aria-label="Next section"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Section indicator dots */}
      <div
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-[var(--duration-slow)]",
          controlsVisible ? "opacity-80" : "opacity-0"
        )}
      >
        {sorted.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
              resetHideTimer();
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentIndex
                ? "bg-[var(--color-accent-on-dark)]"
                : "bg-[var(--color-lyric-inactive)]"
            )}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
