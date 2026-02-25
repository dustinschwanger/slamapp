"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Copy, Play, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServicePlanCard,
  type ServicePlan,
} from "@/components/services/ServicePlanCard";

export default function ServicesPage() {
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          const mapped: ServicePlan[] = (data ?? []).map(
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

  // Find the next upcoming ready service
  const today = new Date().toISOString().split("T")[0];
  const upcomingService = plans
    .filter((p) => p.status === "ready" && p.serviceDate && p.serviceDate >= today)
    .sort((a, b) => (a.serviceDate ?? "").localeCompare(b.serviceDate ?? ""))[0];

  function handleDelete(id: string) {
    fetch(`/api/services/${id}`, { method: "DELETE" }).then(() => {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    });
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

      {/* Section 2: Your Service Plans */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
          Your Service Plans
        </h3>
        {loading ? (
          <p className="text-base text-[var(--color-text-tertiary)] py-8 text-center">
            Loading...
          </p>
        ) : plans.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-base text-[var(--color-text-secondary)]">
                Service plans let you organize songs, lessons, and prayer times into a runnable order for your next visit. Create your first plan to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <ServicePlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Quick Actions */}
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
