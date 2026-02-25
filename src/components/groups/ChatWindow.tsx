"use client";

import * as React from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "@/lib/types";

interface ChatWindowProps {
  groupId: string;
  currentUserId: string;
  groupName: string;
}

export function ChatWindow({
  groupId,
  currentUserId,
  groupName,
}: ChatWindowProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Fetch messages on mount
  React.useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/groups/${groupId}/messages?limit=50`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load messages");
        }
        const data = await res.json();
        setChatMessages(data.messages);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load messages";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, [groupId]);

  // Auto-scroll on new messages
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    setIsSending(true);

    // Optimistic update
    const optimisticMessage: ChatMessage = {
      id: `msg-local-${Date.now()}`,
      groupId,
      senderId: currentUserId,
      senderName: "You",
      senderInitials: "",
      content: text,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    setChatMessages((prev) => [...prev, optimisticMessage]);
    setInputValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch(`/api/groups/${groupId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      const serverMessage: ChatMessage = await res.json();

      // Replace optimistic message with server response
      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === optimisticMessage.id ? serverMessage : m
        )
      );
    } catch {
      // Remove optimistic message on failure
      setChatMessages((prev) =>
        prev.filter((m) => m.id !== optimisticMessage.id)
      );
      // Restore the input
      setInputValue(text);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-grow
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-col h-[500px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {groupName}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 mx-auto mb-2 text-[var(--color-text-tertiary)] animate-spin" />
            <p className="text-sm text-[var(--color-text-secondary)]">
              Loading messages...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--color-error)]">{error}</p>
          </div>
        )}

        {!isLoading && !error && chatMessages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--color-text-tertiary)]">
              No messages yet. Start the conversation!
            </p>
          </div>
        )}

        {chatMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            senderName={msg.senderName}
            senderInitials={msg.senderInitials}
            timestamp={msg.timestamp}
            isOwnMessage={msg.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-end gap-3 p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className={cn(
            "flex-1 resize-none rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
            "focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
          )}
          aria-label="Message input"
        />
        <Button
          onClick={handleSend}
          size="icon"
          disabled={!inputValue.trim() || isSending}
          aria-label="Send message"
        >
          {isSending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
