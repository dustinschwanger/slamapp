"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ServicePlanItem } from "@/lib/types";

interface ServiceItemEditorProps {
  item: ServicePlanItem | null;
  open: boolean;
  onClose: () => void;
  onSave: (item: ServicePlanItem) => void;
}

export function ServiceItemEditor({
  item,
  open,
  onClose,
  onSave,
}: ServiceItemEditorProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(1);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNotes(item.notes ?? "");
      setDurationMinutes(Math.max(1, Math.round(item.estimatedDurationSeconds / 60)));
    }
  }, [item]);

  function handleSave() {
    if (!item) return;

    onSave({
      ...item,
      title: title.trim() || item.title,
      notes: notes.trim() || undefined,
      estimatedDurationSeconds: durationMinutes * 60,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          {/* Title */}
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Title
            </label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Item title"
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="edit-notes"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Notes (optional)
            </label>
            <Textarea
              id="edit-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes for this item..."
              className="min-h-[100px]"
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="edit-duration"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Duration (minutes)
            </label>
            <Input
              id="edit-duration"
              type="number"
              min={1}
              max={120}
              value={durationMinutes}
              onChange={(e) =>
                setDurationMinutes(
                  Math.max(1, parseInt(e.target.value, 10) || 1)
                )
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
