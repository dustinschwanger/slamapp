"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  MapPin,
  Phone,
  Users,
  Plus,
  DoorOpen,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: string;
  name: string;
  capacity: number | null;
  hasProjector: boolean;
}

interface CommunityWithDetails {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactName: string | null;
  contactPhone: string | null;
  notes: string | null;
  isActive: boolean;
  rooms: Room[];
  _count: {
    groups: number;
  };
}

async function fetchCommunities(): Promise<CommunityWithDetails[]> {
  const response = await fetch("/api/communities");
  if (!response.ok) {
    throw new Error("Failed to fetch communities");
  }
  return response.json();
}

export default function CommunitiesPage() {
  const {
    data: communities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  return (
    <div className="max-w-4xl">
      {/* Back button */}
      <Link href="/admin" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#003B7118]">
            <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Communities
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Manage your nursing home locations
            </p>
          </div>
        </div>

        <Link href="/admin/communities/create">
          <Button size="default">
            <Plus className="h-5 w-5" />
            Add Community
          </Button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading communities...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">
            Failed to load communities. Please try again.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && communities?.length === 0 && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Building2 className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
            No communities yet
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Add your first nursing home community to get started.
          </p>
          <Link href="/admin/communities/create">
            <Button>
              <Plus className="h-5 w-5" />
              Add Community
            </Button>
          </Link>
        </div>
      )}

      {/* Community cards */}
      {communities && communities.length > 0 && (
        <div className="grid gap-4">
          {communities.map((community) => (
            <Link
              key={community.id}
              href={`/admin/communities/${community.id}`}
              className="block"
            >
              <Card className="hover:shadow-[var(--shadow-lg)] transition-shadow duration-[var(--duration-normal)] cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-[var(--radius-md)] bg-[#003B7118] shrink-0">
                      <Building2 className="h-6 w-6 text-[var(--color-primary)]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-1">
                        {community.name}
                      </h3>

                      <div className="flex items-center gap-2 text-base text-[var(--color-text-secondary)] mb-3">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {community.address}, {community.city},{" "}
                          {community.state} {community.zip}
                        </span>
                      </div>

                      {community.contactName && (
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-3">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>
                            {community.contactName}
                            {community.contactPhone &&
                              ` - ${community.contactPhone}`}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="secondary">
                          <DoorOpen className="h-3.5 w-3.5 mr-1" />
                          {community.rooms.length}{" "}
                          {community.rooms.length === 1 ? "room" : "rooms"}
                        </Badge>
                        <Badge variant="secondary">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          {community._count.groups}{" "}
                          {community._count.groups === 1 ? "group" : "groups"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
