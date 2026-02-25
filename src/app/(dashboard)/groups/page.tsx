"use client";

import * as React from "react";
import Link from "next/link";
import { Users, Plus, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GroupCard } from "@/components/groups/GroupCard";
import { useChurch } from "@/components/providers/ChurchProvider";
import type { Group } from "@/lib/types";

export default function GroupsPage() {
  const { userId, userRole } = useChurch();
  const [allGroups, setAllGroups] = React.useState<Group[]>([]);
  const [myGroups, setMyGroups] = React.useState<Group[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const canCreate = userRole === "admin" || userRole === "leader" || userRole === "super_admin";

  React.useEffect(() => {
    async function fetchGroups() {
      setIsLoading(true);
      setError(null);

      try {
        const [allRes, myRes] = await Promise.all([
          fetch("/api/groups"),
          fetch("/api/groups?myGroups=true"),
        ]);

        if (!allRes.ok) {
          const data = await allRes.json();
          throw new Error(data.error || "Failed to load groups");
        }

        if (!myRes.ok) {
          const data = await myRes.json();
          throw new Error(data.error || "Failed to load your groups");
        }

        const allData: Group[] = await allRes.json();
        const myData: Group[] = await myRes.json();

        setAllGroups(allData);
        setMyGroups(myData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load groups";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroups();
  }, [userId]);

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D6A18]">
            <Users className="h-5 w-5 text-[#2E7D6A]" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Groups</h2>
        </div>

        {canCreate && (
          <Link href="/groups/create">
            <Button size="default">
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          </Link>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading groups...
          </p>
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">{error}</p>
        </div>
      )}

      {/* Tabs */}
      {!isLoading && !error && (
        <Tabs defaultValue="my-groups">
          <TabsList>
            <TabsTrigger value="my-groups">
              My Groups ({myGroups.length})
            </TabsTrigger>
            <TabsTrigger value="all-groups">
              All Groups ({allGroups.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups">
            {myGroups.length === 0 ? (
              <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                <p className="text-base text-[var(--color-text-secondary)] mb-1">
                  You are not a member of any groups yet
                </p>
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  Switch to the &quot;All Groups&quot; tab to browse and join an existing group, or ask a leader to create one.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {myGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all-groups">
            {allGroups.length === 0 ? (
              <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                <p className="text-base text-[var(--color-text-secondary)]">
                  No groups have been created yet. Groups help organize your ministry teams by community or meeting schedule.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {allGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
