"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { ServiceRunner } from "@/components/services/ServiceRunner";
import type { ServicePlan } from "@/lib/types";

export default function ServiceRunPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<ServicePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    let cancelled = false;

    async function fetchPlan() {
      try {
        const res = await fetch(`/api/services/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Service plan not found");
          }
          throw new Error(`Failed to load service plan (${res.status})`);
        }
        const data = await res.json();

        if (!cancelled) {
          // Map API response to ServicePlan shape
          const mapped: ServicePlan = {
            id: data.id,
            name: data.name,
            description: data.description ?? undefined,
            serviceDate: data.serviceDate ?? undefined,
            communityId: data.communityId ?? undefined,
            roomId: data.roomId ?? undefined,
            groupId: data.groupId ?? undefined,
            isTemplate: data.isTemplate ?? false,
            status: data.status ?? "draft",
            postServiceNotes: data.postServiceNotes ?? undefined,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            communityName: data.community?.name,
            roomName: data.room?.name,
            groupName: data.group?.name,
            items: (data.items ?? []).map(
              (item: {
                id: string;
                position: number;
                type: string;
                title: string;
                notes?: string;
                estimatedDurationSeconds: number;
                itemData: unknown;
              }) => ({
                id: item.id,
                position: item.position,
                type: item.type,
                title: item.title,
                notes: item.notes ?? undefined,
                estimatedDurationSeconds: item.estimatedDurationSeconds,
                itemData: item.itemData ?? {},
              })
            ),
          };
          setPlan(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setLoading(false);
        }
      }
    }

    fetchPlan();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-[var(--color-text-tertiary)]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-lg">Loading service plan...</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <AlertCircle className="w-12 h-12 text-[var(--color-error)]" />
        <p className="text-xl text-[var(--color-text-primary)] font-semibold">
          {error || "Service plan not found"}
        </p>
        <a
          href="/services"
          className="text-[var(--color-primary)] hover:underline text-lg"
        >
          Back to Services
        </a>
      </div>
    );
  }

  return <ServiceRunner plan={plan} />;
}
