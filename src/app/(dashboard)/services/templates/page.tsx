"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Loader2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ServicePlanCard,
  type ServicePlan,
} from "@/components/services/ServicePlanCard";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<ServicePlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTemplates() {
      try {
        const res = await fetch("/api/services?isTemplate=true");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            const mapped: ServicePlan[] = (data ?? []).map(
              (p: {
                id: string;
                name: string;
                description?: string;
                serviceDate?: string;
                status: string;
                isTemplate?: boolean;
                community?: { name: string };
                items?: { estimatedDurationSeconds?: number }[];
              }) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                serviceDate: p.serviceDate
                  ? p.serviceDate.split("T")[0]
                  : undefined,
                status: p.status as ServicePlan["status"],
                itemCount: Array.isArray(p.items) ? p.items.length : 0,
                communityName: p.community?.name,
                estimatedDuration: Array.isArray(p.items)
                  ? Math.round(
                      p.items.reduce(
                        (sum: number, item: { estimatedDurationSeconds?: number }) =>
                          sum + (item.estimatedDurationSeconds ?? 0),
                        0
                      ) / 60
                    )
                  : 0,
                isTemplate: p.isTemplate ?? true,
              })
            );
            setTemplates(mapped);
          }
        }
      } catch {
        // API not available yet
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTemplates();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Service Templates
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-1">
          Start from a template to quickly build your next service plan.
        </p>
      </div>

      {/* Template grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-[var(--color-text-tertiary)]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-lg">Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <ClipboardList className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
            <p className="text-base text-[var(--color-text-secondary)]">
              No templates yet. Create your first one to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {templates.map((template) => (
            <ServicePlanCard key={template.id} plan={template} />
          ))}
        </div>
      )}

      {/* Create new template */}
      <Link href="/services/create">
        <Button size="lg">
          <Plus className="h-5 w-5" />
          <span>Create New Template</span>
        </Button>
      </Link>
    </div>
  );
}
