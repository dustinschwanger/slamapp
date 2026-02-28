"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  Eye,
  Loader2,
  Pencil,
  Play,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface StudyService {
  id: string;
  name: string;
  description?: string;
  serviceDate?: string;
  status: string;
  studyPlanWeek: number;
  studyPlanName: string;
  itemCount: number;
}

const statusConfig: Record<
  string,
  { label: string; variant: "secondary" | "default" | "success"; icon: typeof Pencil }
> = {
  draft: { label: "Draft", variant: "secondary", icon: Pencil },
  ready: { label: "Ready", variant: "default", icon: Check },
  completed: { label: "Completed", variant: "success", icon: Check },
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

export default function StudyPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: studyPlanId } = use(params);
  const router = useRouter();
  const [services, setServices] = useState<StudyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`/api/services?studyPlanId=${studyPlanId}`);
        if (res.ok) {
          const data = await res.json();
          const mapped: StudyService[] = (data ?? []).map(
            (p: Record<string, unknown>) => ({
              id: p.id as string,
              name: p.name as string,
              description: p.description as string | undefined,
              serviceDate: p.serviceDate
                ? (p.serviceDate as string).split("T")[0]
                : undefined,
              status: p.status as string,
              studyPlanWeek: p.studyPlanWeek as number,
              studyPlanName: p.studyPlanName as string,
              itemCount: Array.isArray(p.items)
                ? (p.items as unknown[]).length
                : 0,
            })
          );
          mapped.sort((a, b) => a.studyPlanWeek - b.studyPlanWeek);
          setServices(mapped);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [studyPlanId]);

  const handleDelete = async () => {
    if (!confirm("Delete this study plan and all its services? This cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/study-plans?studyPlanId=${studyPlanId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Study plan deleted");
        router.push("/reading/study-plans");
      } else {
        toast.error("Failed to delete study plan");
      }
    } catch {
      toast.error("Failed to delete study plan");
    } finally {
      setDeleting(false);
    }
  };

  const planName = services[0]?.studyPlanName ?? "Study Plan";
  const total = services.length;
  const readyOrDone = services.filter(
    (s) => s.status === "ready" || s.status === "completed"
  ).length;
  const progressPercent = total > 0 ? Math.round((readyOrDone / total) * 100) : 0;

  // Extract lesson title from service name: "Plan Name - Week N: Lesson Title" -> "Lesson Title"
  const getLessonTitle = (serviceName: string) => {
    const match = serviceName.match(/Week \d+:\s*(.+)$/);
    return match ? match[1] : serviceName;
  };

  // Extract scripture from description
  const getScripture = (description?: string) => {
    if (!description) return null;
    const dashIdx = description.indexOf(" - ");
    return dashIdx > 0 ? description.substring(0, dashIdx) : description;
  };

  return (
    <div>
      {/* Back link */}
      <Link
        href="/reading/study-plans"
        className="inline-flex items-center gap-2 text-primary hover:text-primary-hover mb-6 min-h-[48px]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Study Plans
      </Link>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">Study plan not found</p>
          <p className="text-sm mt-1">
            This study plan may have been deleted.
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                {planName}
              </h2>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mt-4">
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
          </div>

          {/* Week-by-week list */}
          <div className="space-y-3 mb-8">
            {services.map((service) => {
              const config = statusConfig[service.status] ?? statusConfig.draft;
              const lessonTitle = getLessonTitle(service.name);
              const scripture = getScripture(service.description);

              return (
                <Card
                  key={service.id}
                  className="relative overflow-hidden"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      service.status === "completed"
                        ? "bg-[var(--color-success)]"
                        : service.status === "ready"
                          ? "bg-[var(--color-primary)]"
                          : "bg-[var(--color-bg-secondary)]"
                    }`}
                  />
                  <CardContent className="p-4 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {/* Week number */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-sm font-bold text-[var(--color-primary)] w-10 shrink-0">
                          W{service.studyPlanWeek}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base font-medium text-text-primary truncate">
                              {lessonTitle}
                            </span>
                            <Badge variant={config.variant} className="shrink-0">
                              {config.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                            {scripture && (
                              <span className="text-sm text-text-secondary">
                                {scripture}
                              </span>
                            )}
                            {service.serviceDate && (
                              <span className="text-sm text-text-tertiary inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(service.serviceDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 pl-13 sm:pl-0">
                        {service.status === "draft" && (
                          <Link href={`/services/${service.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 min-h-[44px]"
                            >
                              <Pencil className="h-4 w-4" />
                              Prepare
                            </Button>
                          </Link>
                        )}
                        {service.status === "ready" && (
                          <Link href={`/services/${service.id}/run`}>
                            <Button
                              variant="default"
                              size="sm"
                              className="gap-1.5 min-h-[44px]"
                            >
                              <Play className="h-4 w-4" />
                              Run
                            </Button>
                          </Link>
                        )}
                        {service.status === "completed" && (
                          <Link href={`/services/${service.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 min-h-[44px]"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Delete button */}
          <div className="border-t border-[var(--color-border)] pt-6">
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={deleting}
              className="text-[var(--color-error)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 gap-2"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete Study Plan
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
