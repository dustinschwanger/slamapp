"use client";

import Link from "next/link";
import { BookOpen, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StudyPlanSummary } from "@/lib/types";

interface StudyPlanCardProps {
  plan: StudyPlanSummary;
}

export function StudyPlanCard({ plan }: StudyPlanCardProps) {
  const total = plan.weekCount;
  const readyOrDone = plan.progress.ready + plan.progress.completed;
  const progressPercent = total > 0 ? Math.round((readyOrDone / total) * 100) : 0;

  return (
    <Card className="relative overflow-hidden hover:shadow-[var(--shadow-lg)] transition-shadow duration-[var(--duration-normal)]">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003B71]" />

      <CardContent className="p-5 pl-6">
        {/* Header: name + book badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
            {plan.name}
          </h3>
          {plan.book && (
            <Badge variant="default" className="shrink-0">
              <BookOpen className="h-3 w-3 mr-1" />
              {plan.book}
            </Badge>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)] mb-1.5">
            <span>
              {readyOrDone} of {total} services ready
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)] mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {total} {total === 1 ? "week" : "weeks"}
          </span>
          <span>
            Created{" "}
            {new Date(plan.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Action */}
        <Link href={`/reading/study-plans/${plan.studyPlanId}`}>
          <Button variant="outline" size="sm" className="gap-1.5">
            View
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
