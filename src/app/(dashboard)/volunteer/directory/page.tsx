"use client";

import * as React from "react";
import { Calendar, Users, Loader2, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { roleLabels, roleColors, type Volunteer, type VolunteerRole } from "@/lib/types";

export default function VolunteerDirectoryPage() {
  const [volunteers, setVolunteers] = React.useState<Volunteer[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchVolunteers() {
      try {
        const res = await fetch("/api/volunteers/directory");
        if (res.ok) {
          const data = await res.json();
          setVolunteers(data.volunteers ?? []);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }
    fetchVolunteers();
  }, []);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D4F18]">
          <Calendar className="h-5 w-5 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          Volunteer Directory
        </h2>
      </div>

      <p className="text-base text-[var(--color-text-secondary)] mb-6">
        {loading
          ? "Loading volunteers..."
          : `${volunteers.length} active volunteer${volunteers.length !== 1 ? "s" : ""} serving across our communities.`}
      </p>

      {/* Volunteer list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-success" />
        </div>
      ) : volunteers.length > 0 ? (
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Users className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
            No volunteers yet
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Volunteers will appear here once they join the ministry.
          </p>
        </div>
      )}
    </div>
  );
}

function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  const roleColor = roleColors[volunteer.role as VolunteerRole] ?? "var(--color-primary)";

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar size="lg" className="shrink-0">
          <AvatarFallback>{volunteer.initials}</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">
              {volunteer.name}
            </span>
            <Badge
              className="text-xs text-white"
              style={{ backgroundColor: roleColor }}
            >
              {volunteer.roleLabel}
            </Badge>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-secondary)] mb-2">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
              {volunteer.email}
            </span>
            {volunteer.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
                {volunteer.phone}
              </span>
            )}
          </div>

          {/* Groups */}
          {volunteer.groups.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {volunteer.groups.map((group, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {group}
                </Badge>
              ))}
            </div>
          )}

          {/* Joined date */}
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
            Joined{" "}
            {new Date(volunteer.joinedDate + "T00:00:00").toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
