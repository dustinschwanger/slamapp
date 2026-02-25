"use client";

import * as React from "react";
import {
  ClipboardList,
  Music,
  BookOpen,
  Users,
  Heart,
  Calendar,
  Settings,
} from "lucide-react";
import { DashboardCard } from "@/components/layout/DashboardCard";

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
    title: "Volunteer",
    description: "Scheduling, calendar, and directory",
    icon: Calendar,
    href: "/volunteer",
    accentColor: "#2E7D4F",
    countKey: "shifts" as const,
  },
  {
    title: "Admin",
    description: "Metrics, applications, and content management",
    icon: Settings,
    href: "/admin",
    accentColor: "#6B6580",
    countKey: "applications" as const,
  },
];

interface AnalyticsData {
  services: { upcoming: number };
  prayerRequests: { active: number };
  groups: { total: number };
  shifts: { upcoming: number };
  applications: { pending: number };
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
    case "applications":
      return data.applications.pending;
    default:
      return undefined;
  }
}

export default function DashboardPage() {
  const greeting = getGreeting();
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null);

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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">{greeting}</h2>
        <p className="text-text-secondary mt-1">
          Welcome to SLAM. Select a hub to get started.
        </p>
      </div>

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
