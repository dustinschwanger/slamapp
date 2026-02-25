"use client";

import { useState } from "react";
import { Music, BookOpen, GraduationCap, Heart, FileText } from "lucide-react";
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
}

const TABS = [
  { id: "songs", label: "Songs", icon: Music, color: "var(--color-worship)" },
  { id: "scripture", label: "Scripture", icon: BookOpen, color: "var(--color-primary)" },
  { id: "lessons", label: "Lessons", icon: GraduationCap, color: "#0891B2" },
  { id: "prayer", label: "Prayer", icon: Heart, color: "var(--color-prayer)" },
  { id: "custom", label: "Custom", icon: FileText, color: "var(--color-text-tertiary)" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AddItemPanel({ onAddItem, songs, lessons }: AddItemPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("songs");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
        Add Items
      </h3>

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
        {activeTab === "songs" && <AddSongPanel onAddItem={onAddItem} songs={songs} />}
        {activeTab === "scripture" && (
          <AddScripturePanel onAddItem={onAddItem} />
        )}
        {activeTab === "lessons" && (
          <AddLessonBlockPanel onAddItem={onAddItem} lessons={lessons} />
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
