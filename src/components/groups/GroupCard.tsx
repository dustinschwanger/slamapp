import Link from "next/link";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Group } from "@/lib/types";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5 border-l-4 border-l-[#2E7D6A]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          {group.name}
        </h3>
        <Badge variant="secondary">
          <Users className="h-3.5 w-3.5 mr-1" />
          {group.memberCount}
        </Badge>
      </div>

      {/* Description */}
      {group.description && (
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
          {group.description}
        </p>
      )}

      {/* Details */}
      <div className="space-y-2 mb-4">
        {group.meetingDay && group.meetingTime && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Clock className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]" />
            <span>
              {group.meetingDay} at {group.meetingTime}
            </span>
          </div>
        )}
        {group.communityName && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <MapPin className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]" />
            <span>{group.communityName}</span>
          </div>
        )}
        {group.leaderName && (
          <div className="text-sm text-[var(--color-text-tertiary)]">
            Led by {group.leaderName}
          </div>
        )}
      </div>

      {/* Action */}
      <Link href={`/groups/${group.id}`}>
        <Button variant="default" size="default" className="w-full">
          View Group
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
