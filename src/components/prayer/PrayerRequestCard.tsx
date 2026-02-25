"use client";

import * as React from "react";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { PrayingButton } from "./PrayingButton";
import type { PrayerRequest } from "@/lib/types";

interface PrayerRequestCardProps {
  request: PrayerRequest;
  currentUserId?: string;
  onTogglePraying?: () => void;
  onAddToService?: (request: PrayerRequest) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PrayerRequestCard({
  request,
  currentUserId = "",
  onTogglePraying,
  onAddToService,
}: PrayerRequestCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const isUserPraying = request.prayingUserIds.includes(currentUserId);

  const statusBorderClass =
    request.status === "answered"
      ? "border-l-[var(--color-success)]"
      : request.status === "urgent"
        ? "border-l-[var(--color-warning)]"
        : "border-l-[var(--color-prayer)]";

  const needsTruncation = request.requestText.length > 180;
  const displayText =
    needsTruncation && !expanded
      ? request.requestText.slice(0, 180) + "..."
      : request.requestText;

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5 border-l-4",
        statusBorderClass
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            {request.isAnonymous ? "Anonymous" : request.requesterName}
          </span>
          {request.status === "answered" && (
            <Badge variant="success">Answered</Badge>
          )}
          {request.status === "urgent" && (
            <Badge variant="warning">Urgent</Badge>
          )}
          {request.status === "active" && (
            <Badge variant="secondary">Active</Badge>
          )}
        </div>
        <span className="text-xs text-[var(--color-text-tertiary)] whitespace-nowrap shrink-0">
          {formatDate(request.createdAt)}
        </span>
      </div>

      {/* Community / Room */}
      {request.communityName && (
        <p className="text-sm text-[var(--color-text-tertiary)] mb-2">
          {request.communityName}
          {request.room && ` - ${request.room}`}
        </p>
      )}

      {/* Request text */}
      <p className="text-base text-[var(--color-text-primary)] leading-relaxed mb-4">
        {displayText}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-[var(--color-prayer)] font-medium hover:underline cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PrayingButton
            count={request.prayingCount}
            isActive={isUserPraying}
            onToggle={onTogglePraying}
          />
          {onAddToService && (
            <button
              onClick={() => onAddToService(request)}
              className="inline-flex items-center gap-1.5 min-h-[48px] px-3 rounded-[var(--radius-md)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
              aria-label="Add to service plan"
            >
              <ClipboardList className="w-4 h-4" />
              Add to Service
            </button>
          )}
        </div>
        {request.answeredAt && (
          <span className="text-xs text-[var(--color-success)]">
            Answered {formatDate(request.answeredAt)}
          </span>
        )}
      </div>
    </div>
  );
}
