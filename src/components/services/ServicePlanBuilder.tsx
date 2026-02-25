"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, CheckCircle, Copy, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ServiceTimeline } from "@/components/services/ServiceTimeline";
import { AddItemPanel } from "@/components/services/AddItemPanel";
import { ServiceItemEditor } from "@/components/services/ServiceItemEditor";
import type { ServicePlanItem, ServicePlan, Song, LessonContent } from "@/lib/types";

interface LessonWithMeta extends LessonContent {
  id: string;
  scheduledDate?: string;
  isPublished?: boolean;
}

interface Community {
  id: string;
  name: string;
}

interface ServicePlanBuilderProps {
  initialPlan?: ServicePlan;
}

export function ServicePlanBuilder({ initialPlan }: ServicePlanBuilderProps) {
  const router = useRouter();

  const [planName, setPlanName] = useState(initialPlan?.name ?? "");
  const [planDescription, setPlanDescription] = useState(
    initialPlan?.description ?? ""
  );
  const [serviceDate, setServiceDate] = useState(
    initialPlan?.serviceDate ?? ""
  );
  const [communityId, setCommunityId] = useState(
    initialPlan?.communityId ?? ""
  );
  const [communities, setCommunities] = useState<Community[]>([]);
  const [items, setItems] = useState<ServicePlanItem[]>(
    initialPlan?.items ?? []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddPanelMobile, setShowAddPanelMobile] = useState(false);

  // Data arrays (to be populated from API in future)
  const [songs] = useState<Song[]>([]);
  const [lessons] = useState<LessonWithMeta[]>([]);

  // Fetch communities for the dropdown
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/communities");
        if (res.ok) {
          const data = await res.json();
          setCommunities(
            (data ?? []).map((c: { id: string; name: string }) => ({
              id: c.id,
              name: c.name,
            }))
          );
        }
      } catch {
        // Communities not available
      }
    }
    fetchCommunities();
  }, []);

  // Add item to end of list
  const addItem = useCallback(
    (itemWithoutIdPosition: Omit<ServicePlanItem, "id" | "position">) => {
      const newItem: ServicePlanItem = {
        ...itemWithoutIdPosition,
        id: crypto.randomUUID(),
        position: items.length,
      };
      setItems((prev) => [...prev, newItem]);
    },
    [items.length]
  );

  // Reorder items (drag-and-drop)
  const reorderItems = useCallback((oldIndex: number, newIndex: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return next.map((item, i) => ({ ...item, position: i }));
    });
  }, []);

  // Remove item
  const removeItem = useCallback((index: number) => {
    setItems((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, position: i }))
    );
  }, []);

  // Edit item
  const openEditor = useCallback((index: number) => {
    setEditingIndex(index);
  }, []);

  const saveEditedItem = useCallback(
    (updatedItem: ServicePlanItem) => {
      if (editingIndex === null) return;
      setItems((prev) =>
        prev.map((item, i) => (i === editingIndex ? updatedItem : item))
      );
      setEditingIndex(null);
    },
    [editingIndex]
  );

  // Save plan
  async function savePlan(status: "draft" | "ready", isTemplate = false) {
    setSaving(true);
    try {
      const body = {
        name: planName.trim() || "Untitled Service Plan",
        description: planDescription.trim() || undefined,
        serviceDate: isTemplate ? undefined : serviceDate || undefined,
        communityId: communityId || undefined,
        isTemplate,
        status,
        items: items.map((item, i) => ({ ...item, position: i })),
      };

      const url = initialPlan
        ? `/api/services/${initialPlan.id}`
        : "/api/services";
      const method = initialPlan ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(
          isTemplate
            ? "Template saved"
            : status === "ready"
              ? "Service plan marked ready"
              : "Draft saved"
        );
        router.push("/services");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Failed to save service plan");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar: plan metadata */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="plan-name"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Plan Name
            </label>
            <Input
              id="plan-name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g. Sunday Morning Worship"
              className="text-lg font-semibold"
            />
          </div>
          <div>
            <label
              htmlFor="service-date"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            >
              Service Date
            </label>
            <Input
              id="service-date"
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="community-select"
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          >
            Community
          </label>
          <select
            id="community-select"
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            className="w-full md:w-1/2 h-12 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
          >
            <option value="">Select a community...</option>
            {communities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
            Linking a community shows its prayer requests during the service.
          </p>
        </div>
        <div className="mt-4">
          <label
            htmlFor="plan-description"
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          >
            Description (optional)
          </label>
          <Textarea
            id="plan-description"
            value={planDescription}
            onChange={(e) => setPlanDescription(e.target.value)}
            placeholder="Brief description of this service..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* Main content: timeline + add panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: Timeline (60%) */}
        <div className="lg:col-span-3 bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] p-5">
          <ServiceTimeline
            items={items}
            onReorder={reorderItems}
            onRemove={removeItem}
            onEdit={openEditor}
          />

          {/* Mobile: show add panel toggle */}
          <div className="lg:hidden mt-4">
            <Button
              variant="outline"
              onClick={() => setShowAddPanelMobile(!showAddPanelMobile)}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              {showAddPanelMobile ? "Hide Add Panel" : "Add Items"}
            </Button>
            {showAddPanelMobile && (
              <div className="mt-4">
                <AddItemPanel onAddItem={addItem} songs={songs} lessons={lessons} />
              </div>
            )}
          </div>
        </div>

        {/* Right column: Add panel (40%) - hidden on mobile */}
        <div className="hidden lg:block lg:col-span-2 bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] p-5">
          <AddItemPanel onAddItem={addItem} songs={songs} lessons={lessons} />
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => savePlan("draft")}
          variant="outline"
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button
          onClick={() => savePlan("ready")}
          disabled={saving}
          className="gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Mark Ready
        </Button>
        <Button
          onClick={() => savePlan("draft", true)}
          variant="ghost"
          disabled={saving}
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Save as Template
        </Button>
      </div>

      {/* Item editor dialog */}
      <ServiceItemEditor
        item={editingIndex !== null ? items[editingIndex] ?? null : null}
        open={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        onSave={saveEditedItem}
      />
    </div>
  );
}
