"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { roleLabels, type VolunteerRole } from "@/lib/types";
import Link from "next/link";

interface CommunityOption {
  id: string;
  name: string;
  rooms: { id: string; name: string }[];
}

const volunteerRoles: { value: VolunteerRole; label: string }[] = (
  Object.entries(roleLabels) as [VolunteerRole, string][]
).map(([value, label]) => ({ value, label }));

export default function CreateShiftPage() {
  const router = useRouter();
  const [communities, setCommunities] = React.useState<CommunityOption[]>([]);
  const [communitiesLoading, setCommunitiesLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  // Form state
  const [communityId, setCommunityId] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [shiftDate, setShiftDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [roleNeeded, setRoleNeeded] = React.useState<string>("greeter");
  const [maxVolunteers, setMaxVolunteers] = React.useState(5);
  const [notes, setNotes] = React.useState("");

  const selectedCommunity = communities.find((c) => c.id === communityId);
  const rooms = selectedCommunity?.rooms ?? [];

  React.useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/communities");
        if (res.ok) {
          const data = await res.json();
          setCommunities(
            (data ?? []).map(
              (c: { id: string; name: string; rooms: { id: string; name: string }[] }) => ({
                id: c.id,
                name: c.name,
                rooms: c.rooms ?? [],
              })
            )
          );
        }
      } catch {
        // Communities API not available
      } finally {
        setCommunitiesLoading(false);
      }
    }
    fetchCommunities();
  }, []);

  // Reset room when community changes
  React.useEffect(() => {
    setRoomId("");
  }, [communityId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!communityId) {
      toast.error("Please select a community");
      return;
    }
    if (!shiftDate) {
      toast.error("Please select a date");
      return;
    }
    if (!startTime || !endTime) {
      toast.error("Please set start and end times");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/volunteers/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          communityId,
          roomId: roomId || undefined,
          shiftDate,
          startTime,
          endTime,
          roleNeeded,
          maxVolunteers,
          notes: notes || undefined,
        }),
      });

      if (res.ok) {
        toast.success("Shift created successfully");
        router.push("/volunteer");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to create shift");
      }
    } catch {
      toast.error("Failed to create shift");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/volunteer">
          <Button variant="ghost" size="icon" aria-label="Back to Volunteer Hub">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D4F18]">
            <Calendar className="h-5 w-5 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">
            Create Shift
          </h2>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Community */}
            <div>
              <label
                htmlFor="community"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Community *
              </label>
              {communitiesLoading ? (
                <div className="flex items-center gap-2 text-[var(--color-text-tertiary)]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading communities...</span>
                </div>
              ) : (
                <select
                  id="community"
                  value={communityId}
                  onChange={(e) => setCommunityId(e.target.value)}
                  required
                  className="flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
                >
                  <option value="">Select a community</option>
                  {communities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Room */}
            {communityId && rooms.length > 0 && (
              <div>
                <label
                  htmlFor="room"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Room (optional)
                </label>
                <select
                  id="room"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
                >
                  <option value="">Any room</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date */}
            <div>
              <label
                htmlFor="shiftDate"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Date *
              </label>
              <Input
                id="shiftDate"
                type="date"
                value={shiftDate}
                onChange={(e) => setShiftDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Times */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  Start Time *
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  End Time *
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role Needed */}
            <div>
              <label
                htmlFor="roleNeeded"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Role Needed *
              </label>
              <select
                id="roleNeeded"
                value={roleNeeded}
                onChange={(e) => setRoleNeeded(e.target.value)}
                required
                className="flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
              >
                {volunteerRoles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Volunteers */}
            <div>
              <label
                htmlFor="maxVolunteers"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Max Volunteers
              </label>
              <Input
                id="maxVolunteers"
                type="number"
                min={1}
                max={50}
                value={maxVolunteers}
                onChange={(e) =>
                  setMaxVolunteers(parseInt(e.target.value, 10) || 5)
                }
              />
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Notes (optional)
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or details for this shift..."
                className="min-h-[80px]"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <Link href="/volunteer" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  className="w-full"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="default"
                size="default"
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Shift"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
