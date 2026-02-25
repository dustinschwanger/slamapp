"use client";

import { useState, useEffect } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getChapter } from "@/lib/bible/api";
import type { BibleChapter } from "@/lib/bible/types";
import type { ServicePlanItem, ScriptureItemData } from "@/lib/types";

interface RunnerScriptureContentProps {
  item: ServicePlanItem;
  chapter: BibleChapter | null;
  onChapterLoaded: (chapter: BibleChapter) => void;
}

export function RunnerScriptureContent({
  item,
  chapter,
  onChapterLoaded,
}: RunnerScriptureContentProps) {
  const itemData = item.itemData as ScriptureItemData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chapter) return;
    if (!itemData.chapterId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getChapter(itemData.chapterId)
      .then((result) => {
        if (!cancelled) {
          onChapterLoaded(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load scripture");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData.chapterId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-tertiary)]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-lg">Loading scripture...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-error)]">
        <BookOpen className="w-12 h-12" />
        <p className="text-xl">Failed to load scripture</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-tertiary)]">
        <BookOpen className="w-12 h-12" />
        <p className="text-xl">No scripture content</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {itemData.reference || chapter.reference}
        </h2>
        <Badge variant="secondary">{itemData.version || "KJV"}</Badge>
      </div>

      {/* Scripture content */}
      <div
        className="font-reading text-xl leading-[1.8] text-[var(--color-text-primary)] scripture-content"
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />
    </div>
  );
}
