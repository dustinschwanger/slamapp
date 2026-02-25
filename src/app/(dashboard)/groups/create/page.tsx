"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CommunityOption {
  id: string;
  name: string;
  rooms: { id: string; name: string }[];
}

const groupFormSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  communityId: z.string().optional(),
  roomId: z.string().optional(),
  meetingDay: z.string().optional(),
  meetingTime: z.string().optional(),
});

type GroupFormData = z.infer<typeof groupFormSchema>;

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateGroupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [communities, setCommunities] = React.useState<CommunityOption[]>([]);
  const [isLoadingCommunities, setIsLoadingCommunities] = React.useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: standardSchemaResolver(groupFormSchema),
    defaultValues: {
      name: "",
      description: "",
      communityId: "",
      roomId: "",
      meetingDay: "",
      meetingTime: "",
    },
  });

  const selectedCommunityId = watch("communityId");
  const selectedCommunity = communities.find(
    (c) => c.id === selectedCommunityId
  );
  const availableRooms = selectedCommunity?.rooms ?? [];

  React.useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/communities");
        if (res.ok) {
          const data = await res.json();
          setCommunities(data);
        }
      } catch {
        // Non-critical: communities list is optional
      } finally {
        setIsLoadingCommunities(false);
      }
    }
    fetchCommunities();
  }, []);

  const onSubmit = async (data: GroupFormData) => {
    setIsSubmitting(true);

    try {
      const payload: Record<string, unknown> = {
        name: data.name,
      };

      if (data.description) payload.description = data.description;
      if (data.communityId) payload.communityId = data.communityId;
      if (data.roomId) payload.roomId = data.roomId;
      if (data.meetingDay) payload.meetingDay = data.meetingDay;
      if (data.meetingTime) payload.meetingTime = data.meetingTime;

      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create group");
      }

      toast.success("Group created successfully");
      router.push("/groups");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create group";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Back button */}
      <Link href="/groups" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Groups
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D6A18]">
          <Users className="h-5 w-5 text-[#2E7D6A]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Create Group
        </h2>
      </div>

      {/* Form */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Group Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Group Name <span className="text-[var(--color-error)]">*</span>
            </label>
            <Input
              id="name"
              placeholder='e.g., "Tuesday Morning Worship"'
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--color-error)]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Brief description of this group's purpose or activities..."
              autoGrow
              {...register("description")}
            />
          </div>

          {/* Community */}
          <div>
            <label
              htmlFor="communityId"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Community
            </label>
            <select
              id="communityId"
              className="w-full h-[var(--touch-default)] rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
              {...register("communityId")}
              disabled={isLoadingCommunities}
            >
              <option value="">
                {isLoadingCommunities
                  ? "Loading communities..."
                  : "Select a community (optional)"}
              </option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room (only if community selected) */}
          {selectedCommunityId && availableRooms.length > 0 && (
            <div>
              <label
                htmlFor="roomId"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Room
              </label>
              <select
                id="roomId"
                className="w-full h-[var(--touch-default)] rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
                {...register("roomId")}
              >
                <option value="">Select a room (optional)</option>
                {availableRooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Meeting Day & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="meetingDay"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Meeting Day
              </label>
              <select
                id="meetingDay"
                className="w-full h-[var(--touch-default)] rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
                {...register("meetingDay")}
              >
                <option value="">Select a day (optional)</option>
                {DAYS_OF_WEEK.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="meetingTime"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Meeting Time
              </label>
              <Input
                id="meetingTime"
                type="time"
                {...register("meetingTime")}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
            <Link href="/groups">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
