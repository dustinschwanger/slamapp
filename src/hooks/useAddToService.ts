"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ServicePlanItem } from "@/lib/types";

type NewItem = Omit<ServicePlanItem, "id" | "position">;

interface PlanSummary {
  id: string;
  name: string;
  serviceDate: string | null;
  status: string;
  communityName?: string;
  _count?: { items: number };
  items?: unknown[];
  community?: { name: string } | null;
}

export function useAddToService() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingItems, setPendingItems] = useState<NewItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: plans = [],
    isLoading: plansLoading,
  } = useQuery<PlanSummary[]>({
    queryKey: ["service-plans-for-add"],
    queryFn: async () => {
      const res = await fetch("/api/services?isTemplate=false");
      if (!res.ok) throw new Error("Failed to fetch plans");
      const data: PlanSummary[] = await res.json();
      // Sort soonest date first; plans without a date go to the end
      data.sort((a, b) => {
        if (!a.serviceDate && !b.serviceDate) return 0;
        if (!a.serviceDate) return 1;
        if (!b.serviceDate) return -1;
        return a.serviceDate.localeCompare(b.serviceDate);
      });
      return data;
    },
    enabled: isOpen,
    staleTime: 0,
  });

  const openDialog = useCallback((items: NewItem | NewItem[]) => {
    setPendingItems(Array.isArray(items) ? items : [items]);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setPendingItems([]);
  }, []);

  const addToPlan = useCallback(
    async (planId: string) => {
      if (pendingItems.length === 0) return;
      setIsSubmitting(true);
      try {
        const res = await fetch(`/api/services/${planId}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: pendingItems }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to add items");
        }

        const data = await res.json();
        toast.success(`Added to "${data.planName}"`);
        closeDialog();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [pendingItems, closeDialog]
  );

  return {
    isOpen,
    plans,
    plansLoading,
    isSubmitting,
    pendingItemCount: pendingItems.length,
    openDialog,
    closeDialog,
    addToPlan,
  };
}
