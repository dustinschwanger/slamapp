"use client";

import * as React from "react";
import { Users, MapPin, Clock, User, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Group } from "@/lib/types";

export default function GroupDirectoryPage() {
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchGroups() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/groups");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load groups");
        }
        const data: Group[] = await res.json();
        setAllGroups(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load groups";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroups();
  }, []);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D6A18]">
          <Users className="h-5 w-5 text-[#2E7D6A]" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          Group Directory
        </h2>
      </div>

      <p className="text-base text-[var(--color-text-secondary)] mb-6">
        All ministry groups with meeting times and locations.
      </p>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading directory...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">{error}</p>
        </div>
      )}

      {/* Group list */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {allGroups.length === 0 ? (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
              <p className="text-base text-[var(--color-text-secondary)]">
                No groups have been created yet.
              </p>
            </div>
          ) : (
            allGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {group.name}
                  </h3>
                  <Badge variant="secondary">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {group.memberCount} members
                  </Badge>
                </div>

                {group.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    {group.description}
                  </p>
                )}

                <div className="grid gap-2 sm:grid-cols-3">
                  {group.meetingDay && group.meetingTime && (
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Clock className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                      {group.meetingDay} at {group.meetingTime}
                    </div>
                  )}
                  {group.communityAddress && (
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <MapPin className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                      {group.communityAddress}
                    </div>
                  )}
                  {group.leaderName && (
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <User className="h-4 w-4 text-[var(--color-text-tertiary)]" />
                      Led by {group.leaderName}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
