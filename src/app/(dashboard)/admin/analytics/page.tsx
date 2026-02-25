"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Users,
  Heart,
  Calendar,
  ClipboardList,
  Loader2,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsData {
  communities: { total: number; active: number };
  volunteers: { total: number };
  services: { completed: number; upcoming: number; thisMonth: number };
  prayerRequests: {
    active: number;
    answeredThisMonth: number;
    total: number;
    thisWeek: number;
  };
  groups: { total: number; totalMembers: number };
  shifts: { upcoming: number; thisMonth: number };
  applications: { pending: number };
}

interface StatCardData {
  label: string;
  value: number;
  sublabel?: string;
  icon: typeof Building2;
  color: string;
  bgColor: string;
}

export default function AnalyticsPage() {
  const [data, setData] = React.useState<AnalyticsData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--color-text-tertiary)]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Inbox className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-lg font-medium text-[var(--color-text-primary)]">
            Unable to load analytics
          </p>
        </div>
      </div>
    );
  }

  const sections: { title: string; cards: StatCardData[] }[] = [
    {
      title: "Communities",
      cards: [
        {
          label: "Total Communities",
          value: data.communities.total,
          icon: Building2,
          color: "var(--color-primary)",
          bgColor: "#2D5A8E18",
        },
        {
          label: "Active Communities",
          value: data.communities.active,
          icon: Building2,
          color: "var(--color-success)",
          bgColor: "#2E7D4F18",
        },
      ],
    },
    {
      title: "Services",
      cards: [
        {
          label: "Upcoming Services",
          value: data.services.upcoming,
          icon: ClipboardList,
          color: "#003B71",
          bgColor: "#003B7118",
        },
        {
          label: "This Month",
          value: data.services.thisMonth,
          icon: ClipboardList,
          color: "var(--color-primary)",
          bgColor: "#2D5A8E18",
        },
        {
          label: "Completed",
          value: data.services.completed,
          icon: ClipboardList,
          color: "var(--color-success)",
          bgColor: "#2E7D4F18",
        },
      ],
    },
    {
      title: "Prayer Requests",
      cards: [
        {
          label: "Active Requests",
          value: data.prayerRequests.active,
          icon: Heart,
          color: "var(--color-prayer)",
          bgColor: "#8B6BAE18",
        },
        {
          label: "This Week",
          value: data.prayerRequests.thisWeek,
          icon: Heart,
          color: "var(--color-prayer)",
          bgColor: "#8B6BAE18",
        },
        {
          label: "Answered This Month",
          value: data.prayerRequests.answeredThisMonth,
          icon: Heart,
          color: "var(--color-success)",
          bgColor: "#2E7D4F18",
        },
        {
          label: "Total All Time",
          value: data.prayerRequests.total,
          icon: Heart,
          color: "var(--color-text-secondary)",
          bgColor: "#6B658018",
        },
      ],
    },
    {
      title: "Groups & Volunteers",
      cards: [
        {
          label: "Active Groups",
          value: data.groups.total,
          icon: Users,
          color: "#2E7D6A",
          bgColor: "#2E7D6A18",
        },
        {
          label: "Group Members",
          value: data.groups.totalMembers,
          icon: Users,
          color: "#2E7D6A",
          bgColor: "#2E7D6A18",
        },
        {
          label: "Volunteers",
          value: data.volunteers.total,
          icon: Users,
          color: "var(--color-success)",
          bgColor: "#2E7D4F18",
        },
        {
          label: "Upcoming Shifts",
          value: data.shifts.upcoming,
          icon: Calendar,
          color: "var(--color-worship)",
          bgColor: "#C68B5918",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl">
      {/* Back button */}
      <Link href="/admin" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2D5A8E18]">
          <BarChart3 className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Analytics</h2>
      </div>

      {/* Pending applications banner */}
      {data.applications.pending > 0 && (
        <Link href="/admin/applications">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-warning)] bg-[#B8860B10] p-4 mb-6 flex items-center gap-3">
            <Inbox className="h-5 w-5 text-[var(--color-warning)]" />
            <span className="text-base font-medium text-[var(--color-text-primary)]">
              {data.applications.pending} pending volunteer application
              {data.applications.pending !== 1 ? "s" : ""} to review
            </span>
          </div>
        </Link>
      )}

      {/* Stat Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              {section.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {section.cards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)]"
                          style={{ backgroundColor: stat.bgColor }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: stat.color }}
                          />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
