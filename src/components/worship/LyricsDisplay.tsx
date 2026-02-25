"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import type { SongLyricSection } from "@/lib/types";

interface LyricsDisplayProps {
  lyrics: SongLyricSection[];
  songTitle?: string;
  activeSection?: number;
  onSectionClick?: (index: number) => void;
  autoScroll?: boolean;
  className?: string;
}

function sectionLabel(section: SongLyricSection): string {
  if (section.sectionType === "chorus") return "Chorus";
  if (section.sectionType === "bridge") return "Bridge";
  if (section.sectionType === "tag") return "Tag";
  return `Verse ${section.sectionNumber}`;
}

export function LyricsDisplay({
  lyrics,
  songTitle,
  activeSection = 0,
  onSectionClick,
  autoScroll = true,
  className,
}: LyricsDisplayProps) {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (autoScroll && sectionRefs.current[currentSection]) {
      sectionRefs.current[currentSection]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSection, autoScroll]);

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
    onSectionClick?.(index);
  };

  const sorted = [...lyrics].sort((a, b) => a.displayOrder - b.displayOrder);

  if (sorted.length === 0) {
    return (
      <div className={cn("p-6 text-center text-[var(--color-text-tertiary)]", className)}>
        No lyrics available for this song.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col gap-6 p-6 overflow-y-auto smooth-scroll",
        className
      )}
    >
      {songTitle && (
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center">
          {songTitle}
        </h3>
      )}
      {sorted.map((section, index) => (
        <div
          key={section.displayOrder}
          ref={(el) => { sectionRefs.current[index] = el; }}
          role="button"
          tabIndex={0}
          onClick={() => handleSectionClick(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSectionClick(index);
            }
          }}
          className={cn(
            "p-4 rounded-[var(--radius-md)] cursor-pointer transition-opacity duration-[var(--duration-slow)]",
            index === currentSection
              ? "opacity-100 bg-[var(--color-bg-surface)]"
              : "opacity-60 hover:opacity-80"
          )}
        >
          <p className="text-sm font-semibold text-[var(--color-worship)] mb-2 uppercase tracking-wide">
            {sectionLabel(section)}
          </p>
          <p className="text-[20px] leading-relaxed text-[var(--color-text-primary)] whitespace-pre-line font-[var(--font-primary)]">
            {section.lyrics}
          </p>
        </div>
      ))}
    </div>
  );
}
