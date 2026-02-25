"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PrayingButtonProps {
  count: number;
  isActive?: boolean;
  onToggle?: () => void;
}

export function PrayingButton({
  count,
  isActive = false,
  onToggle,
}: PrayingButtonProps) {
  const [active, setActive] = React.useState(isActive);
  const [displayCount, setDisplayCount] = React.useState(count);

  const handleClick = () => {
    const newActive = !active;
    setActive(newActive);
    setDisplayCount((prev) => (newActive ? prev + 1 : prev - 1));
    onToggle?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-full)] px-5 h-12 min-w-[48px] text-base font-medium transition-colors duration-[var(--duration-normal)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2 cursor-pointer",
        active
          ? "bg-[var(--color-prayer)] text-[var(--color-prayer-foreground)]"
          : "border-2 border-[var(--color-prayer)] text-[var(--color-prayer)] bg-transparent hover:bg-[#8B6BAE12]"
      )}
      aria-label={active ? "Stop praying for this request" : "Pray for this request"}
      aria-pressed={active}
    >
      <Heart
        className={cn("h-5 w-5", active && "fill-current")}
      />
      <span>{displayCount} Praying</span>
    </button>
  );
}
