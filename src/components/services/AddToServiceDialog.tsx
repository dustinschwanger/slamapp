"use client";

import Link from "next/link";
import { CalendarDays, Loader2, ClipboardList } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PlanOption {
  id: string;
  name: string;
  serviceDate: string | null;
  status: string;
  items?: unknown[];
  _count?: { items: number };
  community?: { name: string } | null;
}

interface AddToServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plans: PlanOption[];
  plansLoading: boolean;
  isSubmitting: boolean;
  onSelectPlan: (planId: string) => void;
  itemCount: number;
  itemLabel: string;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "No date";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AddToServiceDialog({
  isOpen,
  onClose,
  plans,
  plansLoading,
  isSubmitting,
  onSelectPlan,
  itemCount,
  itemLabel,
}: AddToServiceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Service Plan</DialogTitle>
          <DialogDescription>
            Adding {itemCount} {itemLabel} — select a plan below
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-2 max-h-80 overflow-y-auto">
          {plansLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--color-text-tertiary)]" />
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-10">
              <ClipboardList className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)] opacity-50" />
              <p className="text-base text-[var(--color-text-secondary)] mb-3">
                No service plans yet
              </p>
              <Link
                href="/services/create"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                Create a service plan
              </Link>
            </div>
          ) : (
            plans.map((plan) => {
              const itemCount = plan._count?.items ?? plan.items?.length ?? 0;
              return (
                <button
                  key={plan.id}
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={isSubmitting}
                  className="flex items-center gap-3 w-full min-h-[56px] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-surface)] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-primary)]/10 shrink-0">
                    <CalendarDays className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-[var(--color-text-primary)] truncate">
                      {plan.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-tertiary)] truncate">
                      {formatDate(plan.serviceDate)}
                      {plan.community?.name ? ` · ${plan.community.name}` : ""}
                      {` · ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin text-[var(--color-text-tertiary)] shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
