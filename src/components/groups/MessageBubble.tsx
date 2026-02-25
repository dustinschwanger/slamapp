import { cn } from "@/lib/utils/cn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageBubbleProps {
  content: string;
  senderName: string;
  senderInitials: string;
  timestamp: string;
  isOwnMessage: boolean;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
          {formatRelativeTime(timestamp)}
        </span>
      </div>
    </div>
  );
}
