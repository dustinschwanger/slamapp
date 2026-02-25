"use client";

import { useState } from "react";
import { BookOpen, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  parseReference,
  estimateVerseDuration,
} from "@/lib/bible/reference-parser";
import type { ServicePlanItem } from "@/lib/types";

interface AddScripturePanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
}

const VERSIONS = [
  { value: "KJV", label: "KJV - King James Version" },
  { value: "ASV", label: "ASV - American Standard Version" },
  { value: "WEB", label: "WEB - World English Bible" },
];

export function AddScripturePanel({ onAddItem }: AddScripturePanelProps) {
  const [reference, setReference] = useState("");
  const [version, setVersion] = useState("KJV");
  const [error, setError] = useState<string | null>(null);

  function handleAdd() {
    setError(null);
    const parsed = parseReference(reference);
    if (!parsed) {
      setError(
        'Could not parse reference. Try a format like "John 3:16", "Psalm 23", or "1 Corinthians 13:4-8".'
      );
      return;
    }

    onAddItem({
      type: "scripture",
      title: `${parsed.displayReference} (${version})`,
      estimatedDurationSeconds: estimateVerseDuration(
        parsed.startVerse,
        parsed.endVerse
      ),
      itemData: {
        reference: parsed.displayReference,
        version,
        bookId: parsed.bookId,
        chapterId: parsed.chapterId,
      },
    });

    setReference("");
    setError(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Reference input */}
      <div>
        <label
          htmlFor="scripture-reference"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Bible Reference
        </label>
        <Input
          id="scripture-reference"
          value={reference}
          onChange={(e) => {
            setReference(e.target.value);
            if (error) setError(null);
          }}
          placeholder='e.g. "John 3:16-21" or "Psalm 23"'
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
      </div>

      {/* Version selector */}
      <div>
        <label
          htmlFor="scripture-version"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Translation
        </label>
        <select
          id="scripture-version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
        >
          {VERSIONS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-[var(--color-error)]/10 rounded-[var(--radius-md)] text-[var(--color-error)]">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Add button */}
      <Button onClick={handleAdd} disabled={!reference.trim()} className="gap-2">
        <BookOpen className="h-4 w-4" />
        Add Scripture Reading
      </Button>
    </div>
  );
}
