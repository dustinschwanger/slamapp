"use client";

import * as React from "react";
import Link from "next/link";
import {
  ClipboardList,
  Music,
  BookOpen,
  Users,
  Heart,
  Calendar,
  CheckCircle2,
  Circle,
  X,
  Sparkles,
} from "lucide-react";
import { DashboardCard } from "@/components/layout/DashboardCard";
import { useChurch } from "@/components/providers/ChurchProvider";

const hubs = [
  {
    title: "Services",
    description: "Plan and run worship services",
    icon: ClipboardList,
    href: "/services",
    accentColor: "#003B71",
    countKey: "services" as const,
  },
  {
    title: "Worship",
    description: "Song library, playlists, and lyrics projection",
    icon: Music,
    href: "/worship",
    accentColor: "#C68B59",
    countKey: null,
  },
  {
    title: "Lessons",
    description: "Bible reader, lesson templates, and archives",
    icon: BookOpen,
    href: "/reading",
    accentColor: "#003B71",
    countKey: null,
  },
  {
    title: "Groups",
    description: "Group chat, directory, and weekly threads",
    icon: Users,
    href: "/groups",
    accentColor: "#2E7D6A",
    countKey: "groups" as const,
  },
  {
    title: "Prayer",
    description: "Prayer requests, weekly lists, and sharing",
    icon: Heart,
    href: "/prayer",
    accentColor: "#8B6BAE",
    countKey: "prayer" as const,
  },
  {
    title: "Volunteers",
    description: "Scheduling, calendar, and directory",
    icon: Calendar,
    href: "/volunteer",
    accentColor: "#2E7D4F",
    countKey: "shifts" as const,
  },
];

interface AnalyticsData {
  services: { upcoming: number; completed?: number; thisMonth?: number };
  prayerRequests: { active: number };
  groups: { total: number; totalMembers?: number };
  shifts: { upcoming: number };
  communities?: { total: number; active?: number };
  volunteers?: { total: number };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getCount(
  key: string | null,
  data: AnalyticsData | null
): number | undefined {
  if (!data || !key) return undefined;
  switch (key) {
    case "services":
      return data.services.upcoming;
    case "prayer":
      return data.prayerRequests.active;
    case "groups":
      return data.groups.total;
    case "shifts":
      return data.shifts.upcoming;
    default:
      return undefined;
  }
}

const DISMISSED_KEY = "slam-getting-started-dismissed";

interface ChecklistItem {
  label: string;
  description: string;
  href: string;
  done: boolean;
}

function getChecklistItems(data: AnalyticsData | null): ChecklistItem[] {
  if (!data) return [];
  return [
    {
      label: "Add your team",
      description: "Invite volunteers and leaders to join your church.",
      href: "/volunteer",
      done: (data.volunteers?.total ?? 0) > 0,
    },
    {
      label: "Set up communities",
      description: "Add the nursing homes and locations you serve.",
      href: "/admin/communities",
      done: (data.communities?.total ?? 0) > 0,
    },
    {
      label: "Create a group",
      description:
        "Organize your ministry teams by community or schedule.",
      href: "/groups/create",
      done: data.groups.total > 0,
    },
    {
      label: "Build your first service",
      description:
        "Create a service plan with songs, lessons, and prayer.",
      href: "/services/create",
      done:
        (data.services.upcoming +
          (data.services.completed ?? 0) +
          (data.services.thisMonth ?? 0)) > 0,
    },
  ];
}

export default function DashboardPage() {
  const greeting = getGreeting();
  const { userRole } = useChurch();
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null);
  const [dismissed, setDismissed] = React.useState(true); // default hidden to avoid flash

  const isAdminOrLeader =
    userRole === "admin" || userRole === "leader" || userRole === "super_admin";

  React.useEffect(() => {
    setDismissed(localStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  React.useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          setAnalytics(await res.json());
        }
      } catch {
        // Analytics not available (e.g., non-admin user)
      }
    }
    fetchAnalytics();
  }, []);

  const checklist = getChecklistItems(analytics);
  const allComplete = checklist.length > 0 && checklist.every((item) => item.done);
  const showChecklist =
    isAdminOrLeader && !dismissed && !allComplete && analytics !== null;

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">{greeting}</h2>
        <p className="text-text-secondary mt-1">
          Welcome to SLAM. Select a hub to get started.
        </p>
      </div>

      {/* Getting Started checklist for admins/leaders */}
      {showChecklist && (
        <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] overflow-hidden">
          <div className="flex border-l-4 border-l-[var(--color-primary)]">
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Getting Started
                  </h3>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-[var(--radius-md)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                  aria-label="Dismiss getting started guide"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Complete these steps to set up your ministry.
              </p>
              <ul className="space-y-3">
                {checklist.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 group"
                    >
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 text-[var(--color-success)] mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-[var(--color-text-tertiary)] mt-0.5 shrink-0 group-hover:text-[var(--color-primary)] transition-colors" />
                      )}
                      <div>
                        <span
                          className={`text-base font-medium ${
                            item.done
                              ? "text-[var(--color-text-tertiary)] line-through"
                              : "text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]"
                          } transition-colors`}
                        >
                          {item.label}
                        </span>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {hubs.map((hub) => (
          <DashboardCard
            key={hub.href}
            title={hub.title}
            description={hub.description}
            icon={hub.icon}
            href={hub.href}
            accentColor={hub.accentColor}
            count={getCount(hub.countKey, analytics)}
          />
        ))}
      </div>
    </div>
  );
}
