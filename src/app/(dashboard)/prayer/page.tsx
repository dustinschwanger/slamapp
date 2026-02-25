"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PrayerRequestCard } from "@/components/prayer/PrayerRequestCard";
import { AddToServiceDialog } from "@/components/services/AddToServiceDialog";
import { useAddToService } from "@/hooks/useAddToService";
import type { PrayerRequest } from "@/lib/types";

export default function PrayerPage() {
  const addToService = useAddToService();
  const [allRequests, setAllRequests] = React.useState<PrayerRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentUserId, setCurrentUserId] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchPrayers() {
      try {
        const res = await fetch("/api/prayer");
        if (res.ok) {
          const data = await res.json();
          setAllRequests(data.requests ?? []);
        }
      } catch {
        // API not available
      } finally {
        setLoading(false);
      }
    }

    async function fetchUserId() {
      try {
        // Get user context from a simple check — we'll use the church provider data
        // For now, extract from prayer markings or default
        const res = await fetch("/api/prayer?myPrayers=true");
        if (res.ok) {
          // Just to establish user context
        }
      } catch {
        // ignore
      }
    }

    fetchPrayers();
    fetchUserId();
  }, []);

  // Try to get user ID from the prayer data (user is in prayingUserIds if they're praying)
  // A more robust approach would be an API endpoint, but for now this works
  React.useEffect(() => {
    // We set a placeholder that gets replaced when ChurchProvider is available
    setCurrentUserId(""); // Will be populated from context
  }, []);

  const answeredRequests = allRequests.filter((r) => r.status === "answered");
  const urgentAndActive = allRequests.filter(
    (r) => r.status === "active" || r.status === "urgent"
  );
  const myPrayers = currentUserId
    ? allRequests.filter((r) => r.prayingUserIds.includes(currentUserId))
    : [];

  const handleTogglePraying = async (requestId: string) => {
    try {
      const res = await fetch(`/api/prayer/${requestId}/mark`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setAllRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? {
                  ...r,
                  prayingCount: data.prayingCount,
                  prayingUserIds: data.marked
                    ? [...r.prayingUserIds, currentUserId]
                    : r.prayingUserIds.filter((id) => id !== currentUserId),
                }
              : r
          )
        );
      }
    } catch {
      // ignore
    }
  };

  const handleAddPrayerToService = (request: PrayerRequest) => {
    const location = [request.communityName, request.room]
      .filter(Boolean)
      .join(" — ");
    addToService.openDialog({
      type: "prayer_time",
      title: `Prayer Time${location ? ` — ${location}` : ""}`,
      estimatedDurationSeconds: 300,
      itemData: { communityId: request.communityId || undefined },
    });
  };

  const renderPrayerList = (requests: PrayerRequest[]) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-prayer" />
        </div>
      );
    }

    if (requests.length === 0) {
      return (
        <div className="text-center py-12 text-text-secondary">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No prayer requests</p>
          <p className="text-sm mt-1">
            Prayer requests will appear here once created
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {requests.map((request) => (
          <PrayerRequestCard
            key={request.id}
            request={request}
            currentUserId={currentUserId}
            onTogglePraying={() => handleTogglePraying(request.id)}
            onAddToService={handleAddPrayerToService}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#8B6BAE18]">
            <Heart className="h-5 w-5 text-prayer" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">
            Prayer Requests
          </h2>
        </div>
        <Link href="/prayer/create">
          <Button variant="prayer" size="default">
            <Plus className="h-5 w-5" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({allRequests.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({urgentAndActive.length})
          </TabsTrigger>
          <TabsTrigger value="answered">
            Answered ({answeredRequests.length})
          </TabsTrigger>
          <TabsTrigger value="my-prayers">
            My Prayers ({myPrayers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {renderPrayerList(allRequests)}
        </TabsContent>

        <TabsContent value="active">
          {renderPrayerList(urgentAndActive)}
        </TabsContent>

        <TabsContent value="answered">
          {renderPrayerList(answeredRequests)}
        </TabsContent>

        <TabsContent value="my-prayers">
          {renderPrayerList(myPrayers)}
        </TabsContent>
      </Tabs>

      <AddToServiceDialog
        isOpen={addToService.isOpen}
        onClose={addToService.closeDialog}
        plans={addToService.plans}
        plansLoading={addToService.plansLoading}
        isSubmitting={addToService.isSubmitting}
        onSelectPlan={addToService.addToPlan}
        itemCount={addToService.pendingItemCount}
        itemLabel={addToService.pendingItemCount === 1 ? "item" : "items"}
      />
    </div>
  );
}
