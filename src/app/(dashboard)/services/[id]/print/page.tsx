"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  ServicePlan,
  ServicePlanItem,
  ScriptureItemData,
  LessonBlockItemData,
  AnnouncementItemData,
  CustomItemData,
  LessonContent,
  PrayerRequest,
} from "@/lib/types";

interface LessonWithId extends LessonContent {
  id: string;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  return mins === 1 ? "1 min" : `${mins} min`;
}

function formatDate(dateString: string): string {
  // Handle both ISO datetime (2026-02-25T00:00:00.000Z) and date-only (2026-02-25)
  const date = dateString.includes("T")
    ? new Date(dateString)
    : new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function itemTypeLabel(type: string): string {
  switch (type) {
    case "song":
      return "Song";
    case "scripture":
      return "Scripture";
    case "lesson_block":
      return "Lesson";
    case "prayer_time":
      return "Prayer Time";
    case "announcement":
      return "Announcement";
    case "custom":
      return "Custom";
    default:
      return type;
  }
}

const BLOCK_TYPE_LABELS: Record<string, string> = {
  opening_prayer: "Opening Prayer",
  context: "Context",
  scripture_reading: "Scripture Reading",
  teaching: "Teaching",
  video: "Video",
  discussion: "Discussion",
  application: "Application",
  closing_prayer: "Closing Prayer",
};

function ItemContent({ item, lessons }: { item: ServicePlanItem; lessons: LessonWithId[] }) {
  switch (item.type) {
    case "scripture": {
      const data = item.itemData as ScriptureItemData;
      return (
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {data.reference} ({data.version})
        </p>
      );
    }
    case "announcement":
    case "custom": {
      const data = item.itemData as AnnouncementItemData | CustomItemData;
      return (
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 whitespace-pre-wrap">
          {data.content}
        </p>
      );
    }
    case "lesson_block": {
      const data = item.itemData as LessonBlockItemData;
      const lesson = lessons.find((l) => l.id === data.lessonId);
      if (!lesson) return null;
      const block = lesson.blocks[data.blockIndex];
      if (!block) return null;
      return (
        <div className="mt-2 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {BLOCK_TYPE_LABELS[block.type] ?? block.type}
            {block.type === "scripture_reading" && block.reference && ` — ${block.reference}`}
          </p>
          {block.content && (
            <div
              className="text-sm text-[var(--color-text-secondary)] prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

export default function PrintServicePage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState<ServicePlan | null>(null);
  const [lessons, setLessons] = useState<LessonWithId[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    async function fetchPlan() {
      try {
        const res = await fetch(`/api/services/${params.id}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Service plan not found"
              : `Failed to load (${res.status})`
          );
        }
        const data = await res.json();

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

        // Fetch lessons if there are lesson_block items
        const hasLessons = mapped.items.some((i) => i.type === "lesson_block");
        if (hasLessons) {
          try {
            const lessonsRes = await fetch("/api/lessons?tab=my-lessons");
            if (lessonsRes.ok) {
              const lessonsData = await lessonsRes.json();
              setLessons(lessonsData.lessons ?? []);
            }
          } catch {
            // Lessons are optional for print
          }
        }

        // Fetch community prayer requests if linked
        if (data.communityId) {
          try {
            const prayerRes = await fetch(
              `/api/prayer?communityId=${data.communityId}&status=active`
            );
            if (prayerRes.ok) {
              const prayerData = await prayerRes.json();
              setPrayerRequests(prayerData.requests ?? []);
            }
          } catch {
            // Prayer requests are optional
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-[var(--color-text-tertiary)]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-lg">Loading service plan...</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
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

  const totalDuration = plan.items.reduce(
    (sum, item) => sum + item.estimatedDurationSeconds,
    0
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Print button (hidden when printing) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Print Preview
        </h2>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      {/* Printable content */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-md)] p-8 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b border-[var(--color-border)] pb-4 mb-6 print:border-b-2 print:border-black">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {plan.name}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-[var(--color-text-secondary)]">
            {plan.serviceDate && (
              <span>{formatDate(plan.serviceDate)}</span>
            )}
            {plan.communityName && <span>{plan.communityName}</span>}
            {plan.roomName && <span>{plan.roomName}</span>}
            <span>~{formatDuration(totalDuration)} total</span>
          </div>
          {plan.description && (
            <p className="text-base text-[var(--color-text-secondary)] mt-2">
              {plan.description}
            </p>
          )}
        </div>

        {/* Service order */}
        <div className="space-y-4">
          {plan.items.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-4 pb-4 border-b border-[var(--color-border)] last:border-b-0 print:border-b print:border-gray-200"
            >
              <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-sm font-bold text-[var(--color-text-secondary)] print:bg-gray-100">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-xs text-[var(--color-text-tertiary)]">
                    {itemTypeLabel(item.type)} &middot;{" "}
                    {formatDuration(item.estimatedDurationSeconds)}
                  </span>
                </div>
                <ItemContent item={item} lessons={lessons} />
                {item.notes && (
                  <p className="text-sm text-[var(--color-text-tertiary)] mt-1 italic">
                    Note: {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Community prayer requests */}
        {prayerRequests.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-[var(--color-border)] print:border-black">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
              Prayer Requests — {plan.communityName}
            </h2>
            <div className="space-y-3">
              {prayerRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex gap-3 pb-3 border-b border-[var(--color-border)] last:border-b-0 print:border-gray-200"
                >
                  <span className="shrink-0 text-[var(--color-prayer)] mt-0.5">
                    &bull;
                  </span>
                  <div>
                    <p className="text-base text-[var(--color-text-primary)]">
                      {request.requestText}
                    </p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {request.isAnonymous
                        ? "Anonymous"
                        : request.requesterName}
                      {request.room && ` — ${request.room}`}
                      {request.status === "urgent" && " (Urgent)"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes area for handwriting */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] print:border-gray-300">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
            Notes
          </h2>
          <div className="h-32 border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] print:border-gray-300 print:h-40" />
        </div>
      </div>
    </div>
  );
}
