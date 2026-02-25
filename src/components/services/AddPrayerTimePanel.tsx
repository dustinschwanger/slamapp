"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ServicePlanItem } from "@/lib/types";

interface AddPrayerTimePanelProps {
  onAddItem: (item: Omit<ServicePlanItem, "id" | "position">) => void;
}

export function AddPrayerTimePanel({ onAddItem }: AddPrayerTimePanelProps) {
  const [location, setLocation] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(5);

  function handleAdd() {
    const title = location.trim()
      ? `Prayer Time \u2014 ${location.trim()}`
      : "Prayer Time";

    onAddItem({
      type: "prayer_time",
      title,
      estimatedDurationSeconds: durationMinutes * 60,
      itemData: {
        communityId: undefined,
        roomId: undefined,
      },
    });

    setLocation("");
    setDurationMinutes(5);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Location (optional) */}
      <div>
        <label
          htmlFor="prayer-location"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Community / Room (optional)
        </label>
        <Input
          id="prayer-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='e.g. "Sunrise Senior Living - Chapel"'
        />
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="prayer-duration"
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
        >
          Duration (minutes)
        </label>
        <Input
          id="prayer-duration"
          type="number"
          min={1}
          max={60}
          value={durationMinutes}
          onChange={(e) =>
            setDurationMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))
          }
        />
      </div>

      {/* Add button */}
      <Button variant="prayer" onClick={handleAdd} className="gap-2">
        <Heart className="h-4 w-4" />
        Add Prayer Time
      </Button>
    </div>
  );
}
