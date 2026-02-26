"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { LessonBlock, LessonBlockType } from "@/lib/types";

interface LessonProjectionProps {
  blocks: LessonBlock[];
  startIndex?: number;
  onClose: () => void;
}

const blockLabels: Record<LessonBlockType, string> = {
  opening_prayer: "Opening Prayer",
  context: "Context",
  scripture_reading: "Scripture Reading",
  teaching: "Teaching",
  teacher_notes: "Teacher Notes",
  video: "Video",
  discussion: "Discussion",
  application: "Application",
  closing_prayer: "Closing Prayer",
};

export function LessonProjection({
  blocks,
  startIndex = 0,
  onClose,
}: LessonProjectionProps) {
  const projectableBlocks = blocks.filter((b) => b.projectable);
  const [currentIndex, setCurrentIndex] = React.useState(() => {
    // Find the projectable block closest to the startIndex
    const startBlock = blocks[startIndex];
    if (startBlock) {
      const pIdx = projectableBlocks.indexOf(startBlock);
      return pIdx >= 0 ? pIdx : 0;
    }
    return 0;
  });
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const block = projectableBlocks[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projectableBlocks.length - 1;

  async function toggleFullscreen() {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  React.useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (hasNext) setCurrentIndex((i) => i + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (hasPrev) setCurrentIndex((i) => i - 1);
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!block) return null;

  return (
    <div
      ref={containerRef}
      className="projection-mode fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0">
        <span className="text-sm uppercase tracking-widest text-text-on-dark/50">
          {blockLabels[block.type]}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-on-dark/50">
            {currentIndex + 1} / {projectableBlocks.length}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-[var(--radius-sm)] text-text-on-dark/50 hover:text-text-on-dark transition-colors cursor-pointer"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-sm)] text-text-on-dark/50 hover:text-text-on-dark transition-colors cursor-pointer"
            aria-label="Close projection"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-16 py-8">
        <div className="max-w-4xl w-full text-center">
          {block.reference && (
            <p
              className="projection-accent mb-6"
              style={{
                fontSize: "2.25rem",
                lineHeight: 1.3,
                color: "var(--color-accent-on-dark)",
              }}
            >
              {block.reference}
            </p>
          )}
          <div
            className="projection-lesson"
            style={{
              fontFamily: "var(--font-reading)",
              fontSize: block.type === "discussion" ? "2.5rem" : "2rem",
              lineHeight: 1.5,
              color: "var(--color-text-on-dark)",
            }}
          >
            {block.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-6" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <button
          onClick={() => hasPrev && setCurrentIndex((i) => i - 1)}
          disabled={!hasPrev}
          className={cn(
            "flex items-center justify-center w-[72px] h-[72px] rounded-[var(--radius-lg)] transition-colors cursor-pointer",
            hasPrev
              ? "text-text-on-dark hover:bg-white/10"
              : "text-text-on-dark/20 cursor-not-allowed"
          )}
          aria-label="Previous block"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>

        <button
          onClick={() => hasNext && setCurrentIndex((i) => i + 1)}
          disabled={!hasNext}
          className={cn(
            "flex items-center justify-center w-[72px] h-[72px] rounded-[var(--radius-lg)] transition-colors cursor-pointer",
            hasNext
              ? "text-text-on-dark hover:bg-white/10"
              : "text-text-on-dark/20 cursor-not-allowed"
          )}
          aria-label="Next block"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}
