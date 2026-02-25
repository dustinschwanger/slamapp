"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface PostServiceNotesProps {
  open: boolean;
  onClose: () => void;
  onSave: (notes: string) => void;
}

export function PostServiceNotes({ open, onClose, onSave }: PostServiceNotesProps) {
  const [notes, setNotes] = useState("");

  function handleSave() {
    onSave(notes);
    setNotes("");
  }

  function handleSkip() {
    onClose();
    setNotes("");
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Service Complete</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <label
            htmlFor="post-service-notes"
            className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
          >
            Post-Service Notes
          </label>
          <textarea
            id="post-service-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did the service go? Any notes for next time?"
            rows={5}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-y"
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={handleSkip} className="min-h-[48px]">
            Skip
          </Button>
          <Button onClick={handleSave} className="min-h-[48px]">
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
