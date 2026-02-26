import { cn } from "@/lib/utils/cn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageBubbleProps {
  content: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isOwnMessage: boolean;
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today at ${time}`;
  if (isYesterday) return `Yesterday at ${time}`;

  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });

  return `${dateStr} at ${time}`;
}

export function MessageBubble({
  content,
  senderName,
  senderInitials,
  timestamp,
  isOwnMessage,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%]",
        isOwnMessage ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar - hidden for own messages */}
      {!isOwnMessage && (
        <Avatar size="default" className="shrink-0 mt-1">
          <AvatarFallback>{senderInitials}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        {/* Sender name */}
        {!isOwnMessage && (
          <span className="text-sm font-bold text-[var(--color-text-secondary)] mb-1 px-1">
            {senderName}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "rounded-[var(--radius-lg)] px-4 py-3 text-base leading-relaxed",
            isOwnMessage
              ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-br-[var(--radius-sm)]"
              : "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-bl-[var(--radius-sm)]"
          )}
        >
          {content}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-[var(--color-text-tertiary)] mt-1 px-1">
          {formatDateTime(timestamp)}
        </span>
      </div>
    </div>
  );
}
