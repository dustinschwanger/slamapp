"use client";

import { useState } from "react";
import { Music, BookOpen, GraduationCap, Heart, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ServicePlanItem, Song, LessonContent } from "@/lib/types";
import { AddSongPanel } from "@/components/services/AddSongPanel";
import { AddScripturePanel } from "@/components/services/AddScripturePanel";
import { AddLessonBlockPanel } from "@/components/services/AddLessonBlockPanel";
import { AddPrayerTimePanel } from "@/components/services/AddPrayerTimePanel";
import { AddCustomItemPanel } from "@/components/services/AddCustomItemPanel";

interface LessonWithMeta extends LessonContent {
  id: string;
  scheduledDate?: string;
  isPublished?: boolean;
}

interface AddItemPanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
  songs: Song[];
  lessons: LessonWithMeta[];
  existingItems: ServicePlanItem[];
}

const QUICK_ADD_ITEMS: {
  label: string;
  type: ServicePlanItem["type"];
  durationSeconds: number;
  itemData: ServicePlanItem["itemData"];
}[] = [
  { label: "Opening Prayer", type: "prayer_time", durationSeconds: 120, itemData: {} },
  { label: "Closing Prayer", type: "prayer_time", durationSeconds: 120, itemData: {} },
  { label: "Prayer Time", type: "prayer_time", durationSeconds: 300, itemData: {} },
  { label: "Announcements", type: "custom", durationSeconds: 180, itemData: { content: "", projectable: false } },
];

const TABS = [
  { id: "songs", label: "Songs", icon: Music, color: "var(--color-worship)" },
  { id: "scripture", label: "Scripture", icon: BookOpen, color: "var(--color-primary)" },
  { id: "lessons", label: "Lessons", icon: GraduationCap, color: "#0891B2" },
  { id: "prayer", label: "Prayer", icon: Heart, color: "var(--color-prayer)" },
  { id: "custom", label: "Custom", icon: FileText, color: "var(--color-text-tertiary)" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AddItemPanel({ onAddItem, songs, lessons, existingItems }: AddItemPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("songs");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
        Add Items
      </h3>
      <p className="text-sm text-[var(--color-text-tertiary)] -mt-2">
        You can also add songs and lessons directly from the{" "}
        <a href="/worship" className="underline hover:text-[var(--color-text-secondary)]">Worship</a> and{" "}
        <a href="/reading/lessons" className="underline hover:text-[var(--color-text-secondary)]">Lessons</a> pages.
      </p>

      {/* Quick Add buttons */}
      <div className="flex flex-wrap gap-2">
        {QUICK_ADD_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() =>
              onAddItem({
                type: item.type,
                title: item.label,
                estimatedDurationSeconds: item.durationSeconds,
                itemData: item.itemData,
              })
            }
            className="flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-[var(--radius-md)] text-sm font-medium bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-[var(--radius-md)] text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                  : "bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
              )}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === "songs" && <AddSongPanel onAddItem={onAddItem} songs={songs} existingItems={existingItems} />}
        {activeTab === "scripture" && (
          <AddScripturePanel onAddItem={onAddItem} />
        )}
        {activeTab === "lessons" && (
          <AddLessonBlockPanel onAddItem={onAddItem} lessons={lessons} existingItems={existingItems} />
        )}
        {activeTab === "prayer" && (
          <AddPrayerTimePanel onAddItem={onAddItem} />
        )}
        {activeTab === "custom" && (
          <AddCustomItemPanel onAddItem={onAddItem} />
        )}
      </div>
    </div>
  );
}
