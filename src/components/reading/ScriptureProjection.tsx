"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BibleChapter } from "@/lib/bible/types";

interface ScriptureProjectionProps {
  chapter: BibleChapter;
  onClose: () => void;
}

/**
 * Parses HTML chapter content into individual verse segments for projection.
 * Each segment contains 2-3 verses for readability on a projected screen.
 */
function parseVersesFromHtml(html: string): string[] {
  // Create a temporary container to parse HTML
  const div = document.createElement("div");
  div.innerHTML = html;

  // Extract text, splitting on verse number spans
  const text = div.textContent || div.innerText || "";

  // Split by verse numbers (superscript numbers followed by content)
  // API.Bible typically wraps verse numbers in spans with class "v"
  const versePattern = /\s*(\d+)\s+/g;
  const parts: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = versePattern.exec(text)) !== null) {
    if (lastIndex > 0) {
      const content = text.slice(lastIndex, match.index).trim();
      if (content) parts.push(content);
    }
    lastIndex = match.index;
  }
  // Get the last part
  if (lastIndex < text.length) {
    const content = text.slice(lastIndex).trim();
    if (content) parts.push(content);
  }

  // If parsing fails, just return the whole text in chunks
  if (parts.length === 0) {
    const plainText = text.trim();
    if (!plainText) return [];
    // Split into reasonable chunks (~300 chars)
    const chunks: string[] = [];
    const sentences = plainText.split(/(?<=\.)\s+/);
    let current = "";
    for (const sentence of sentences) {
      if (current.length + sentence.length > 300 && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += (current ? " " : "") + sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }

  // Group into pages of 2-3 verses each
  const pages: string[] = [];
  const versesPerPage = 3;
  for (let i = 0; i < parts.length; i += versesPerPage) {
    const group = parts.slice(i, i + versesPerPage).join(" ");
    pages.push(group);
  }

  return pages;
}

export function ScriptureProjection({
  chapter,
  onClose,
}: ScriptureProjectionProps) {
  const [pages, setPages] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const parsed = parseVersesFromHtml(chapter.content);
    setPages(parsed.length > 0 ? parsed : [chapter.content]);
    setCurrentPage(0);
  }, [chapter]);

  const hasPrev = currentPage > 0;
  const hasNext = currentPage < pages.length - 1;

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
        if (hasNext) setCurrentPage((p) => p + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (hasPrev) setCurrentPage((p) => p - 1);
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div
      ref={containerRef}
      className="projection-mode fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 shrink-0">
        <span className="text-sm uppercase tracking-widest text-text-on-dark/50">
          Scripture Reading
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-on-dark/50">
            {currentPage + 1} / {pages.length}
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
      <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 py-8">
        <div className="max-w-4xl w-full text-center">
          {/* Verse text */}
          <p
            className="projection-scripture mb-8"
            style={{
              fontFamily: "var(--font-primary)",
              fontWeight: 700,
              fontSize: "3rem",
              lineHeight: 1.5,
              color: "var(--color-text-on-dark)",
            }}
          >
            {pages[currentPage]}
          </p>

          {/* Reference */}
          <p
            className="projection-accent"
            style={{
              fontSize: "2.25rem",
              lineHeight: 1.3,
              color: "var(--color-accent-on-dark)",
            }}
          >
            {chapter.reference}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <button
          onClick={() => hasPrev && setCurrentPage((p) => p - 1)}
          disabled={!hasPrev}
          className={cn(
            "flex items-center justify-center w-[72px] h-[72px] rounded-[var(--radius-lg)] transition-colors cursor-pointer",
            hasPrev
              ? "text-text-on-dark hover:bg-white/10"
              : "text-text-on-dark/20 cursor-not-allowed"
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-10 w-10" />
        </button>

        <button
          onClick={() => hasNext && setCurrentPage((p) => p + 1)}
          disabled={!hasNext}
          className={cn(
            "flex items-center justify-center w-[72px] h-[72px] rounded-[var(--radius-lg)] transition-colors cursor-pointer",
            hasNext
              ? "text-text-on-dark hover:bg-white/10"
              : "text-text-on-dark/20 cursor-not-allowed"
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}
