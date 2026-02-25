"use client";

import * as React from "react";
import { MapPin, Clock, UserPlus, UserMinus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { roleColors, type Shift } from "@/lib/types";

interface ShiftCardProps {
  shift: Shift;
  currentUserId?: string;
  onSignUp?: (shiftId: string) => void;
  onWithdraw?: (shiftId: string) => void;
}

function formatShiftDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function ShiftCard({
  shift,
  currentUserId,
  onSignUp,
  onWithdraw,
}: ShiftCardProps) {
  const isSignedUp = currentUserId
    ? shift.signedUpIds.includes(currentUserId)
    : false;
  const isFull = shift.signedUpIds.length >= shift.maxVolunteers;
  const spotsLeft = shift.maxVolunteers - shift.signedUpIds.length;
  const roleColor = roleColors[shift.role];

  const handleSignUp = () => {
    onSignUp?.(shift.id);
  };

  const handleWithdraw = () => {
    onWithdraw?.(shift.id);
  };

  return (
    <div
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5"
      style={{ borderLeftWidth: "4px", borderLeftColor: roleColor }}
    >
      {/* Date + Role */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-lg font-bold text-[var(--color-text-primary)]">
            {formatShiftDate(shift.date)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="h-4 w-4 text-[var(--color-text-tertiary)]" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {shift.startTime} - {shift.endTime}
            </span>
          </div>
        </div>
        <span
          className="inline-flex items-center rounded-[var(--radius-full)] px-3 py-1 text-sm font-medium text-white"
          style={{ backgroundColor: roleColor }}
        >
          {shift.roleLabel}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-3">
        <MapPin className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]" />
        <span>
          {shift.communityName}
          {shift.room ? ` - ${shift.room}` : ""}
        </span>
      </div>

      {/* Volunteers signed up */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {shift.signedUpNames.length > 0 ? (
            <div className="flex -space-x-2">
              {shift.signedUpNames.slice(0, 3).map((name, i) => (
                <Avatar
                  key={i}
                  size="sm"
                  className="border-2 border-[var(--color-bg-card)]"
                >
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : null}
          <span className="text-sm text-[var(--color-text-tertiary)]">
            {shift.signedUpIds.length}/{shift.maxVolunteers} signed up
          </span>
        </div>
        {!isFull && !isSignedUp && (
          <span className="text-sm font-medium text-[var(--color-success)]">
            {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
          </span>
        )}
      </div>

      {/* Sign up / Withdraw button */}
      {isSignedUp ? (
        <Button
          onClick={handleWithdraw}
          variant="outline"
          size="default"
          className="w-full"
        >
          <UserMinus className="h-5 w-5" />
          Withdraw
        </Button>
      ) : isFull ? (
        <div className="flex items-center justify-center h-12 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] text-base font-medium text-[var(--color-text-tertiary)]">
          Shift Full
        </div>
      ) : (
        <Button
          onClick={handleSignUp}
          variant="default"
          size="default"
          className="w-full"
        >
          <UserPlus className="h-5 w-5" />
          Sign Up
        </Button>
      )}
    </div>
  );
}
