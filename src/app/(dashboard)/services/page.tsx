"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Copy, Play, ClipboardList, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServicePlanCard,
  type ServicePlan,
} from "@/components/services/ServicePlanCard";

interface RawServicePlan extends ServicePlan {
  studyPlanId?: string;
  studyPlanName?: string;
  studyPlanWeek?: number;
}

interface StudyPlanGroup {
  studyPlanId: string;
  name: string;
  services: RawServicePlan[];
  progress: { draft: number; ready: number; completed: number };
}

export default function ServicesPage() {
  const [plans, setPlans] = useState<RawServicePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          const mapped: RawServicePlan[] = (data ?? []).map(
            (p: Record<string, unknown>) => ({
              id: p.id as string,
              name: p.name as string,
              description: p.description as string | undefined,
              serviceDate: p.serviceDate
                ? (p.serviceDate as string).split("T")[0]
                : undefined,
              status: p.status as string,
              itemCount: Array.isArray(p.items)
                ? (p.items as unknown[]).length
                : 0,
              communityName: (
                p.community as { name?: string } | null
              )?.name,
              estimatedDuration: Array.isArray(p.items)
                ? Math.round(
                    (p.items as { estimatedDurationSeconds?: number }[]).reduce(
                      (sum, item) =>
                        sum + (item.estimatedDurationSeconds ?? 0),
                      0
                    ) / 60
                  )
                : 0,
              studyPlanId: p.studyPlanId as string | undefined,
              studyPlanName: p.studyPlanName as string | undefined,
              studyPlanWeek: p.studyPlanWeek as number | undefined,
            })
          );
          setPlans(mapped);
        }
      } catch {
        // API not available yet
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  // Separate standalone vs study-plan-grouped services
  const standalonePlans = plans.filter((p) => !p.studyPlanId);
  const studyPlanGroups: StudyPlanGroup[] = [];

  const groupMap = new Map<string, StudyPlanGroup>();
  for (const plan of plans) {
    if (!plan.studyPlanId) continue;
    if (!groupMap.has(plan.studyPlanId)) {
      groupMap.set(plan.studyPlanId, {
        studyPlanId: plan.studyPlanId,
        name: plan.studyPlanName ?? "Study Plan",
        services: [],
        progress: { draft: 0, ready: 0, completed: 0 },
      });
    }
    const group = groupMap.get(plan.studyPlanId)!;
    group.services.push(plan);
    if (plan.status === "completed") group.progress.completed++;
    else if (plan.status === "ready") group.progress.ready++;
    else group.progress.draft++;
  }
  for (const group of groupMap.values()) {
    group.services.sort((a, b) => (a.studyPlanWeek ?? 0) - (b.studyPlanWeek ?? 0));
    studyPlanGroups.push(group);
  }

  // Find the next upcoming ready service (from standalone or study plan)
  const today = new Date().toISOString().split("T")[0];
  const upcomingService = plans
    .filter((p) => p.status === "ready" && p.serviceDate && p.serviceDate >= today)
    .sort((a, b) => (a.serviceDate ?? "").localeCompare(b.serviceDate ?? ""))[0];

  function handleDelete(id: string) {
    fetch(`/api/services/${id}`, { method: "DELETE" }).then(() => {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    });
  }

  function toggleGroup(studyPlanId: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(studyPlanId)) {
        next.delete(studyPlanId);
      } else {
        next.add(studyPlanId);
      }
      return next;
    });
  }

  // Find the next upcoming service in a study plan group
  function getNextService(group: StudyPlanGroup): RawServicePlan | undefined {
    return group.services.find((s) => s.status === "draft" || s.status === "ready");
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Services
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-1">
          Plan, organize, and run your worship services.
        </p>
      </div>

      {/* Section 1: Next Upcoming Service */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
          Next Upcoming Service
        </h3>
        {upcomingService ? (
          <Card className="relative overflow-hidden border-2 border-[var(--color-primary)]">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--color-primary)]" />
            <CardContent className="p-6 pl-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {upcomingService.name}
                  </h4>
                  {upcomingService.description && (
                    <p className="text-base text-[var(--color-text-secondary)] mt-1">
                      {upcomingService.description}
                    </p>
                  )}
                  <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                    {upcomingService.serviceDate &&
                      new Date(
                        upcomingService.serviceDate + "T00:00:00"
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    {upcomingService.communityName &&
                      ` \u2014 ${upcomingService.communityName}`}
                  </p>
                </div>
                <Link href={`/services/${upcomingService.id}/run`}>
                  <Button size="lg" aria-label="Start service">
                    <Play className="h-5 w-5" />
                    <span>Start Service</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <ClipboardList className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
              <p className="text-base text-[var(--color-text-secondary)] mb-4">
                {loading
                  ? "Loading services..."
                  : "No upcoming services scheduled."}
              </p>
              {!loading && (
                <Link href="/services/create">
                  <Button variant="outline">
                    <Plus className="h-4 w-4" />
                    <span>Create One</span>
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </section>

      {/* Section 2: Study Plan Groups */}
      {studyPlanGroups.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
            Study Plans
          </h3>
          <div className="space-y-3">
            {studyPlanGroups.map((group) => {
              const isExpanded = expandedGroups.has(group.studyPlanId);
              const total = group.services.length;
              const readyOrDone = group.progress.ready + group.progress.completed;
              const nextService = getNextService(group);

              return (
                <Card key={group.studyPlanId} className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003B71]" />
                  <CardContent className="p-0">
                    {/* Collapsible header */}
                    <button
                      onClick={() => toggleGroup(group.studyPlanId)}
                      className="w-full text-left p-5 pl-6 flex items-center gap-3 hover:bg-[var(--color-bg-secondary)]/50 transition-colors min-h-[56px]"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-text-tertiary shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-text-tertiary shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-lg font-bold text-[var(--color-text-primary)]">
                            {group.name}
                          </span>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            {readyOrDone} of {total} ready
                          </span>
                        </div>
                        {/* Mini progress bar */}
                        <div className="h-1.5 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden mt-2 max-w-xs">
                          <div
                            className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
                            style={{
                              width: `${total > 0 ? Math.round((readyOrDone / total) * 100) : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                      <Link
                        href={`/reading/study-plans/${group.studyPlanId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-primary hover:text-primary-hover shrink-0"
                      >
                        View Plan
                      </Link>
                    </button>

                    {/* Collapsed: show next upcoming service only */}
                    {!isExpanded && nextService && (
                      <div className="px-6 pb-4 pl-14">
                        <p className="text-sm text-text-secondary">
                          Next: <span className="font-medium text-text-primary">{nextService.name}</span>
                          {nextService.serviceDate && (
                            <span className="text-text-tertiary ml-2">
                              {new Date(nextService.serviceDate + "T00:00:00").toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* Expanded: show all services */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pl-14 grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {group.services.map((plan) => (
                          <ServicePlanCard
                            key={plan.id}
                            plan={plan}
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 3: Your Services (standalone) */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
          Your Services
        </h3>
        {loading ? (
          <p className="text-base text-[var(--color-text-tertiary)] py-8 text-center">
            Loading...
          </p>
        ) : standalonePlans.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-base text-[var(--color-text-secondary)]">
                {plans.length > 0
                  ? "No standalone service plans. Your study plan services are grouped above."
                  : "Service plans let you organize songs, lessons, and prayer times into a runnable order for your next visit. Create your first plan to get started."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {standalonePlans.map((plan) => (
              <ServicePlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Quick Actions */}
      <section>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/services/create">
            <Button size="lg">
              <Plus className="h-5 w-5" />
              <span>New Plan</span>
            </Button>
          </Link>
          <Link href="/services/templates">
            <Button variant="outline" size="lg">
              <Copy className="h-5 w-5" />
              <span>Browse Templates</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
