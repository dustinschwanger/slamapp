"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoGrow?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoGrow = false, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (autoGrow && internalRef.current) {
          internalRef.current.style.height = "auto";
          internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
        }
        onChange?.(e);
      },
      [autoGrow, onChange]
    );

    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] placeholder:text-[var(--color-text-tertiary)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          autoGrow && "resize-none overflow-hidden",
          className
        )}
        ref={setRefs}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
