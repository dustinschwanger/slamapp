"use client";

import { useState, useCallback, useEffect } from "react";
import type { ServicePlanItem } from "@/lib/types";

interface ServiceRunnerState {
  items: ServicePlanItem[];
  currentIndex: number;
  isProjecting: boolean;
  isFinished: boolean;
}

interface ServiceRunnerActions {
  goNext: () => void;
  goPrev: () => void;
  goToItem: (index: number) => void;
  toggleProjection: () => void;
  closeProjection: () => void;
  finishService: () => void;
}

interface UseServiceRunnerOptions {
  onNext?: () => void;
  onPrev?: () => void;
}

export function useServiceRunner(
  items: ServicePlanItem[],
  options?: UseServiceRunnerOptions
): ServiceRunnerState & ServiceRunnerActions {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProjecting, setIsProjecting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const defaultGoNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= items.length - 1) {
        setIsFinished(true);
        return prev;
      }
      return prev + 1;
    });
  }, [items.length]);

  const defaultGoPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = options?.onNext ?? defaultGoNext;
  const goPrev = options?.onPrev ?? defaultGoPrev;

  const goToItem = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setCurrentIndex(index);
        setIsFinished(false);
      }
    },
    [items.length]
  );

  const toggleProjection = useCallback(() => {
    setIsProjecting((prev) => !prev);
  }, []);

  const closeProjection = useCallback(() => {
    setIsProjecting(false);
  }, []);

  const finishService = useCallback(() => {
    setIsFinished(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture keys when typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "p":
        case "P":
          e.preventDefault();
          toggleProjection();
          break;
        case "Escape":
          e.preventDefault();
          closeProjection();
          break;
        default:
          // Number keys 1-9 jump to item
          if (e.key >= "1" && e.key <= "9") {
            const idx = parseInt(e.key, 10) - 1;
            if (idx < items.length) {
              e.preventDefault();
              goToItem(idx);
            }
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleProjection, closeProjection, goToItem, items.length]);

  return {
    items,
    currentIndex,
    isProjecting,
    isFinished,
    goNext,
    goPrev,
    goToItem,
    toggleProjection,
    closeProjection,
    finishService,
  };
}
