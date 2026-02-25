"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { roleColors, type Shift } from "@/lib/types";

interface VolunteerCalendarProps {
  shifts: Shift[];
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatMonthRange(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const startMonth = weekStart.toLocaleDateString("en-US", { month: "long" });
  const endMonth = weekEnd.toLocaleDateString("en-US", { month: "long" });
  const year = weekStart.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${year}`;
  }
  return `${startMonth} - ${endMonth} ${year}`;
}

export function VolunteerCalendar({ shifts }: VolunteerCalendarProps) {
  const [weekStart, setWeekStart] = React.useState(() => getWeekStart(new Date()));

  // Group shifts by date
  const shiftsByDate = React.useMemo(() => {
    const map = new Map<string, Shift[]>();
    for (const shift of shifts) {
      const existing = map.get(shift.date) ?? [];
      existing.push(shift);
      map.set(shift.date, existing);
    }
    return map;
  }, [shifts]);

  const weekDates = React.useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, [weekStart]);

  const goToPrevWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const goToNextWeek = () => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const goToToday = () => {
    setWeekStart(getWeekStart(new Date()));
  };

  const todayKey = formatDateKey(new Date());

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] overflow-hidden">
      {/* Navigation */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {formatMonthRange(weekStart)}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevWeek}
            aria-label="Previous week"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextWeek}
            aria-label="Next week"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7">
        {/* Day headers */}
        {weekDates.map((date, i) => {
          const key = formatDateKey(date);
          const isToday = key === todayKey;
          return (
            <div
              key={i}
              className={cn(
                "text-center py-3 border-b border-[var(--color-border)]",
                i > 0 && "border-l border-[var(--color-border)]"
              )}
            >
              <div className="text-xs text-[var(--color-text-tertiary)] font-medium">
                {DAY_LABELS[i]}
              </div>
              <div
                className={cn(
                  "text-sm font-semibold mt-1 mx-auto w-8 h-8 flex items-center justify-center rounded-full",
                  isToday
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                    : "text-[var(--color-text-primary)]"
                )}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}

        {/* Shift cells */}
        {weekDates.map((date, i) => {
          const key = formatDateKey(date);
          const dayShifts = shiftsByDate.get(key) ?? [];
          return (
            <div
              key={`cell-${i}`}
              className={cn(
                "min-h-[80px] p-1.5",
                i > 0 && "border-l border-[var(--color-border)]"
              )}
            >
              {dayShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="rounded-[var(--radius-sm)] px-2 py-1.5 mb-1 text-white"
                  style={{ backgroundColor: roleColors[shift.role] }}
                >
                  <div className="text-xs font-medium truncate">
                    {shift.roleLabel}
                  </div>
                  <div className="text-xs opacity-90 truncate">
                    {shift.startTime}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
