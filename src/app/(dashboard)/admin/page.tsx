"use client";

import * as React from "react";
import {
  Settings,
  Building2,
  Users,
  Heart,
  Calendar,
  ChevronRight,
  Inbox,
  BarChart3,
  ClipboardList,
  Loader2,
  StickyNote,
  Plus,
  Pin,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Stats {
  communities: { total: number; active: number };
  volunteers: { total: number };
  prayerRequests: { active: number; thisWeek: number; total: number; answeredThisMonth: number };
  shifts: { upcoming: number; thisMonth: number };
  services: { completed: number; upcoming: number; thisMonth: number };
  applications: { pending: number };
}

interface AdminNote {
  id: string;
  title: string;
  content: string;
  category: string | null;
  isPinned: boolean;
  createdByName: string | null;
  createdAt: string;
}

const quickLinks = [
  { label: "Manage Communities", href: "/admin/communities", icon: Building2 },
  { label: "Review Applications", href: "/admin/applications", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Service Templates", href: "/services/templates", icon: ClipboardList },
];

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

const categoryColors: Record<string, string> = {
  planning: "var(--color-primary)",
  content: "var(--color-worship)",
  urgent: "var(--color-warning)",
  general: "var(--color-text-secondary)",
};

export default function AdminPage() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [notes, setNotes] = React.useState<AdminNote[]>([]);
  const [statsLoading, setStatsLoading] = React.useState(true);
  const [notesLoading, setNotesLoading] = React.useState(true);
  const [showNoteForm, setShowNoteForm] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteContent, setNoteContent] = React.useState("");
  const [noteCategory, setNoteCategory] = React.useState("general");

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/analytics");
        if (res.ok) setStats(await res.json());
      } catch {
        // API not available
      } finally {
        setStatsLoading(false);
      }
    }
    async function fetchNotes() {
      try {
        const res = await fetch("/api/admin/notes");
        if (res.ok) setNotes(await res.json());
      } catch {
        // API not available
      } finally {
        setNotesLoading(false);
      }
    }
    fetchStats();
    fetchNotes();
  }, []);

  const statCards = [
    {
      label: "Total Communities",
      value: stats?.communities.total ?? 0,
      icon: Building2,
      color: "var(--color-primary)",
      bgColor: "#2D5A8E18",
    },
    {
      label: "Active Volunteers",
      value: stats?.volunteers.total ?? 0,
      icon: Users,
      color: "var(--color-success)",
      bgColor: "#2E7D4F18",
    },
    {
      label: "Prayer Requests This Week",
      value: stats?.prayerRequests.thisWeek ?? 0,
      icon: Heart,
      color: "var(--color-prayer)",
      bgColor: "#8B6BAE18",
    },
    {
      label: "Upcoming Shifts",
      value: stats?.shifts.upcoming ?? 0,
      icon: Calendar,
      color: "var(--color-worship)",
      bgColor: "#C68B5918",
    },
  ];

  const handleCreateNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    try {
      const res = await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: noteTitle,
          content: noteContent,
          category: noteCategory,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setNotes((prev) => [created, ...prev]);
        setNoteTitle("");
        setNoteContent("");
        setNoteCategory("general");
        setShowNoteForm(false);
        toast.success("Note created");
      }
    } catch {
      toast.error("Failed to create note");
    }
  };

  const handleTogglePin = async (note: AdminNote) => {
    try {
      const res = await fetch(`/api/admin/notes/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !note.isPinned }),
      });
      if (res.ok) {
        setNotes((prev) =>
          prev
            .map((n) =>
              n.id === note.id ? { ...n, isPinned: !n.isPinned } : n
            )
            .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))
        );
      }
    } catch {
      // ignore
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const res = await fetch(`/api/admin/notes/${noteId}`, {
        method: "DELETE",
      });
      if (res.ok || res.status === 204) {
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
        toast.success("Note deleted");
      }
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#6B658018]">
          <Settings className="h-5 w-5 text-text-tertiary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">Admin Hub</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)]"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                  {statsLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Quick Links
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 hover:bg-[var(--color-bg-secondary)] transition-colors duration-[var(--duration-normal)]"
              >
                <Icon className="h-5 w-5 text-[var(--color-text-tertiary)]" />
                <span className="flex-1 text-base font-medium text-[var(--color-text-primary)]">
                  {link.label}
                </span>
                <ChevronRight className="h-4 w-4 text-[var(--color-text-tertiary)]" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Leadership Notes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Leadership Notes
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNoteForm(!showNoteForm)}
          >
            <Plus className="h-4 w-4" />
            {showNoteForm ? "Cancel" : "Add Note"}
          </Button>
        </div>

        {/* Note creation form */}
        {showNoteForm && (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 mb-4">
            <input
              type="text"
              placeholder="Note title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <textarea
              placeholder="Note content..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={3}
              className="w-full mb-3 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] resize-y focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <div className="flex items-center gap-3">
              <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-sm text-[var(--color-text-primary)]"
              >
                <option value="general">General</option>
                <option value="planning">Planning</option>
                <option value="content">Content</option>
                <option value="urgent">Urgent</option>
              </select>
              <Button size="sm" onClick={handleCreateNote}>
                Save Note
              </Button>
            </div>
          </div>
        )}

        {notesLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--color-text-tertiary)]" />
          </div>
        ) : notes.length > 0 ? (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] divide-y divide-[var(--color-border)]">
            {notes.map((note) => (
              <div key={note.id} className="flex items-start gap-3 p-4">
                <StickyNote className="h-5 w-5 mt-0.5 text-[var(--color-text-tertiary)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-medium text-[var(--color-text-primary)]">
                      {note.title}
                    </span>
                    {note.isPinned && (
                      <Pin className="h-3 w-3 text-[var(--color-primary)]" />
                    )}
                    {note.category && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {note.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[var(--color-text-tertiary)]">
                    {note.createdByName && <span>{note.createdByName}</span>}
                    <span>{formatRelativeTime(note.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleTogglePin(note)}
                    className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-surface)] text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                    aria-label={note.isPinned ? "Unpin note" : "Pin note"}
                  >
                    <Pin className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-surface)] text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors"
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
            <Inbox className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
            <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
              No leadership notes
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Notes from leadership will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
