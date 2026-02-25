"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface TextProjectionProps {
  title: string;
  content: string;
  onClose: () => void;
}

export function TextProjection({ title, content, onClose }: TextProjectionProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-bg-dark)" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors"
        style={{ color: "var(--color-text-on-dark)" }}
        aria-label="Close projection"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Title */}
      <h1
        className="font-display text-4xl md:text-5xl font-bold mb-8 px-8 text-center"
        style={{ color: "var(--color-accent-on-dark)" }}
      >
        {title}
      </h1>

      {/* Content */}
      <div
        className="font-reading text-2xl md:text-3xl leading-relaxed max-w-4xl px-8 text-center"
        style={{ color: "var(--color-text-on-dark)" }}
      >
        {content.split("\n\n").map((paragraph, i) => (
          <p key={i} className={i > 0 ? "mt-6" : ""}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
