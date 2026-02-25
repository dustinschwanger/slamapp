"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, CalendarOff, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { VolunteerCalendar } from "@/components/volunteer/VolunteerCalendar";
import { ShiftCard } from "@/components/volunteer/ShiftCard";
import { useChurch } from "@/components/providers/ChurchProvider";
import type { Shift } from "@/lib/types";

export default function VolunteerPage() {
  const { userId, userRole } = useChurch();
  const [shifts, setShifts] = React.useState<Shift[]>([]);
  const [loading, setLoading] = React.useState(true);

  const canCreateShift = userRole === "admin" || userRole === "leader";

  const fetchShifts = React.useCallback(async () => {
    try {
      const res = await fetch("/api/volunteers/shifts?upcoming=true");
      if (res.ok) {
        const data = await res.json();
        setShifts(data.shifts ?? []);
      }
    } catch {
      // API not available yet
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleSignUp = async (shiftId: string) => {
    try {
      const res = await fetch(`/api/volunteers/shifts/${shiftId}/signup`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setShifts((prev) =>
          prev.map((s) =>
            s.id === shiftId
              ? {
                  ...s,
                  signedUpIds: data.signedUpIds,
                  signedUpNames: data.signedUpNames,
                }
              : s
          )
        );
        toast.success("You have been signed up for this shift");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to sign up");
      }
    } catch {
      toast.error("Failed to sign up for shift");
    }
  };

  const handleWithdraw = async (shiftId: string) => {
    try {
      const res = await fetch(`/api/volunteers/shifts/${shiftId}/signup`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setShifts((prev) =>
          prev.map((s) =>
            s.id === shiftId
              ? {
                  ...s,
                  signedUpIds: data.signedUpIds,
                  signedUpNames: data.signedUpNames,
                }
              : s
          )
        );
        toast.success("You have withdrawn from this shift");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to withdraw");
      }
    } catch {
      toast.error("Failed to withdraw from shift");
    }
  };

  const upcomingShifts = [...shifts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D4F18]">
            <Calendar className="h-5 w-5 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">
            Volunteer Hub
          </h2>
        </div>
        {canCreateShift && (
          <Link href="/volunteer/shifts/create">
            <Button variant="default" size="default">
              <Plus className="h-5 w-5" />
              Create Shift
            </Button>
          </Link>
        )}
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <VolunteerCalendar shifts={shifts} />
      </div>

      {/* Upcoming shifts */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Upcoming Shifts
        </h3>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-success" />
          </div>
        ) : upcomingShifts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingShifts.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                currentUserId={userId}
                onSignUp={handleSignUp}
                onWithdraw={handleWithdraw}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
            <CalendarOff className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
            <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
              No upcoming shifts
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Shifts will appear here once they are scheduled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
