"use client";

import Link from "next/link";
import { Pencil, Play, Trash2, Clock, ListChecks, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export interface ServicePlan {
  id: string;
  name: string;
  description?: string;
  serviceDate?: string;
  status: "draft" | "ready" | "completed";
  itemCount: number;
  communityName?: string;
  estimatedDuration?: number;
  isTemplate?: boolean;
}

interface ServicePlanCardProps {
  plan: ServicePlan;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<
  ServicePlan["status"],
  { label: string; variant: "secondary" | "default" | "success" }
> = {
  draft: { label: "Draft", variant: "secondary" },
  ready: { label: "Ready", variant: "default" },
  completed: { label: "Completed", variant: "success" },
};

function formatDate(dateStr: string): string {
  const date = dateStr.includes("T")
    ? new Date(dateStr)
    : new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

export function ServicePlanCard({ plan, onDelete }: ServicePlanCardProps) {
  const { label: statusLabel, variant: statusVariant } =
    statusConfig[plan.status];

  return (
    <Card
      className={cn(
        "relative overflow-hidden hover:shadow-[var(--shadow-lg)] transition-shadow duration-[var(--duration-normal)]"
      )}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003B71]" />

      <CardContent className="p-5 pl-6">
        {/* Header: title + status */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
            {plan.name}
          </h3>
          <Badge variant={statusVariant} className="shrink-0">
            {statusLabel}
          </Badge>
        </div>

        {/* Description */}
        {plan.description && (
          <p className="text-base text-[var(--color-text-secondary)] mb-3 line-clamp-2">
            {plan.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)] mb-4">
          {plan.serviceDate && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatDate(plan.serviceDate)}
            </span>
          )}
          {plan.communityName && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {plan.communityName}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <ListChecks className="h-4 w-4" />
            {plan.itemCount} {plan.itemCount === 1 ? "item" : "items"}
          </span>
          {plan.estimatedDuration != null && plan.estimatedDuration > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {formatDuration(plan.estimatedDuration)}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link href={`/services/${plan.id}`}>
            <Button variant="outline" size="sm" aria-label={`Edit ${plan.name}`}>
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          </Link>
          {!plan.isTemplate && (
            <Link href={`/services/${plan.id}/run`}>
              <Button variant="default" size="sm" aria-label={`Run ${plan.name}`}>
                <Play className="h-4 w-4" />
                <span>Run</span>
              </Button>
            </Link>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Delete ${plan.name}`}
              onClick={() => onDelete(plan.id)}
              className="text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 ml-auto"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
