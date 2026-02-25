"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ServicePlanBuilder } from "@/components/services/ServicePlanBuilder";
import type { ServicePlan } from "@/lib/types";

export default function EditServicePlanPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<ServicePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch(`/api/services/${params.id}`);
        if (!res.ok) {
          setError("Service plan not found.");
          return;
        }
        const data = await res.json();
        setPlan(data);
      } catch {
        setError("Failed to load service plan.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
        <p className="text-base text-[var(--color-text-secondary)] mt-4">
          Loading service plan...
        </p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-base text-[var(--color-error)]">
          {error ?? "Service plan not found."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Edit Service Plan
        </h2>
        <p className="text-base text-[var(--color-text-secondary)] mt-1">
          Update your service plan items and details.
        </p>
      </div>

      <ServicePlanBuilder initialPlan={plan} />
    </div>
  );
}
