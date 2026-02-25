"use client";

import { cn } from "@/lib/utils/cn";

interface SheetMusicViewProps {
  sheetMusicUrl: string | null;
  songTitle?: string;
  className?: string;
}

export function SheetMusicView({
  sheetMusicUrl,
  songTitle,
  className,
}: SheetMusicViewProps) {
  if (!sheetMusicUrl) {
    return (
      <div className={cn("p-6 text-center text-[var(--color-text-tertiary)]", className)}>
        {songTitle && (
          <p className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
            {songTitle}
          </p>
        )}
        No sheet music available for this song.
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col p-6 overflow-hidden", className)}>
      {songTitle && (
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center mb-4">
          {songTitle}
        </h3>
      )}
      <iframe
        src={sheetMusicUrl}
        title={songTitle ? `Sheet music for ${songTitle}` : "Sheet music"}
        className="w-full flex-1 min-h-[500px] rounded-[var(--radius-md)] border border-[var(--color-border)]"
        aria-label={songTitle ? `Sheet music PDF for ${songTitle}` : "Sheet music PDF"}
      />
    </div>
  );
}
