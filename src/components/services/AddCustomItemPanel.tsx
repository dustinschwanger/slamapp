"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ServicePlanItem } from "@/lib/types";

interface AddCustomItemPanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
}

export function AddCustomItemPanel({ onAddItem }: AddCustomItemPanelProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectable, setProjectable] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(3);

  function handleAdd() {
    if (!title.trim()) return;

    onAddItem({
      type: "custom",
      title: title.trim(),
      estimatedDurationSeconds: durationMinutes * 60,
      itemData: {
        content: content.trim(),
        projectable,
      },
    });

    setTitle("");
    setContent("");
    setProjectable(false);
    setDurationMinutes(3);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label
          htmlFor="custom-title"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Title
        </label>
        <Input
          id="custom-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='e.g. "Welcome & Announcements"'
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="custom-content"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Content (optional)
        </label>
        <Textarea
          id="custom-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Notes or content for this item..."
          className="min-h-[100px]"
        />
      </div>

      {/* Projectable toggle */}
      <label
        htmlFor="custom-projectable"
        className="flex items-center gap-3 min-h-[48px] cursor-pointer"
      >
        <input
          id="custom-projectable"
          type="checkbox"
          checked={projectable}
          onChange={(e) => setProjectable(e.target.checked)}
          className="w-5 h-5 rounded accent-[var(--color-primary)]"
        />
        <span className="text-base text-[var(--color-text-primary)]">
          Show on projection screen
        </span>
      </label>

      {/* Duration */}
      <div>
        <label
          htmlFor="custom-duration"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Duration (minutes)
        </label>
        <Input
          id="custom-duration"
          type="number"
          min={1}
          max={60}
          value={durationMinutes}
          onChange={(e) =>
            setDurationMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))
          }
        />
      </div>

      {/* Add button */}
      <Button onClick={handleAdd} disabled={!title.trim()} variant="outline" className="gap-2">
        <FileText className="h-4 w-4" />
        Add Custom Item
      </Button>
    </div>
  );
}
