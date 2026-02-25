"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrayerRequestForm } from "@/components/prayer/PrayerRequestForm";
import { toast } from "sonner";
import type { Community } from "@/lib/types";

export default function CreatePrayerRequestPage() {
  const router = useRouter();
  const [communities, setCommunities] = React.useState<Community[]>([]);

  React.useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/communities");
        if (res.ok) {
          const data = await res.json();
          setCommunities(data.communities ?? data ?? []);
        }
      } catch {
        // ignore
      }
    }
    fetchCommunities();
  }, []);

  const handleSubmit = async (data: {
    requesterName: string;
    requestText: string;
    communityId: string;
    isAnonymous: boolean;
    isUrgent: boolean;
  }) => {
    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Prayer request submitted");
        router.push("/prayer");
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to submit prayer request");
      }
    } catch {
      toast.error("Failed to submit prayer request");
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Back button */}
      <Link href="/prayer" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Prayer Requests
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#8B6BAE18]">
          <Heart className="h-5 w-5 text-prayer" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          New Prayer Request
        </h2>
      </div>

      {/* Form */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-6">
        <PrayerRequestForm
          onSubmit={handleSubmit}
          communities={communities}
        />
      </div>
    </div>
  );
}
