"use client";

import * as React from "react";
import { BibleReader } from "@/components/reading/BibleReader";
import { ScriptureProjection } from "@/components/reading/ScriptureProjection";
import type { BibleChapter } from "@/lib/bible/types";

export default function BiblePage() {
  const [projectedChapter, setProjectedChapter] = React.useState<BibleChapter | null>(null);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <BibleReader
        defaultBookId="GEN"
        defaultChapterId="GEN.1"
        onProjectRequest={(chapter) => setProjectedChapter(chapter)}
      />

      {projectedChapter && (
        <ScriptureProjection
          chapter={projectedChapter}
          onClose={() => setProjectedChapter(null)}
        />
      )}
    </div>
  );
}
