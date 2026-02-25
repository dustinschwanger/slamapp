"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Building2,
  DoorOpen,
  Loader2,
  Plus,
  Trash2,
  Monitor,
  Users as UsersIcon,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// --- Types ---

interface Room {
  id: string;
  name: string;
  capacity: number | null;
  hasProjector: boolean;
  notes: string | null;
}

interface CommunityDetail {
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

// --- Schemas ---

const communityFormSchema = z.object({
  name: z.string().min(1, "Community name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

type CommunityFormData = z.infer<typeof communityFormSchema>;

const addRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  capacity: z.string().optional(),
  hasProjector: z.boolean().optional(),
  notes: z.string().optional(),
});

type AddRoomFormData = z.infer<typeof addRoomSchema>;

// --- Fetch helper ---

async function fetchCommunity(id: string): Promise<CommunityDetail> {
  const response = await fetch(`/api/communities/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch community");
  }
  return response.json();
}

// --- Component ---

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const communityId = params.id as string;

  const [isSaving, setIsSaving] = React.useState(false);
  const [showAddRoom, setShowAddRoom] = React.useState(false);
  const [roomToDelete, setRoomToDelete] = React.useState<Room | null>(null);
  const [showDeleteCommunity, setShowDeleteCommunity] = React.useState(false);

  // Fetch community
  const {
    data: community,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community", communityId],
    queryFn: () => fetchCommunity(communityId),
  });

  // Community edit form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CommunityFormData>({
    resolver: standardSchemaResolver(communityFormSchema),
  });

  // Populate form when data loads
  React.useEffect(() => {
    if (community) {
      reset({
        name: community.name,
        address: community.address,
        city: community.city,
        state: community.state,
        zip: community.zip,
        contactName: community.contactName ?? "",
        contactPhone: community.contactPhone ?? "",
        notes: community.notes ?? "",
      });
    }
  }, [community, reset]);

  // Add room form
  const {
    register: registerRoom,
    handleSubmit: handleSubmitRoom,
    reset: resetRoom,
    formState: { errors: roomErrors },
  } = useForm<AddRoomFormData>({
    resolver: standardSchemaResolver(addRoomSchema),
    defaultValues: {
      name: "",
      capacity: "",
      hasProjector: false,
      notes: "",
    },
  });

  // Save community mutation
  const onSaveCommunity = async (data: CommunityFormData) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/communities/${communityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update community");
      }

      await queryClient.invalidateQueries({
        queryKey: ["community", communityId],
      });
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast.success("Community updated successfully");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update community";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  // Add room mutation
  const addRoomMutation = useMutation({
    mutationFn: async (data: AddRoomFormData) => {
      const response = await fetch(
        `/api/communities/${communityId}/rooms`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            capacity: data.capacity ? parseInt(data.capacity, 10) : null,
            hasProjector: data.hasProjector ?? false,
            notes: data.notes || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add room");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", communityId],
      });
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      resetRoom();
      setShowAddRoom(false);
      toast.success("Room added successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: async (roomId: string) => {
      const response = await fetch(
        `/api/communities/${communityId}/rooms/${roomId}`,
        { method: "DELETE" }
      );

      if (!response.ok && response.status !== 204) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete room");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", communityId],
      });
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      setRoomToDelete(null);
      toast.success("Room deleted successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // Delete community
  const handleDeleteCommunity = async () => {
    try {
      const response = await fetch(`/api/communities/${communityId}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete community");
      }

      await queryClient.invalidateQueries({ queryKey: ["communities"] });
      toast.success("Community removed successfully");
      router.push("/admin/communities");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete community";
      toast.error(message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl">
        <Link href="/admin/communities" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Communities
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading community...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !community) {
    return (
      <div className="max-w-2xl">
        <Link href="/admin/communities" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Communities
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">
            Failed to load community. It may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Back button */}
      <Link href="/admin/communities" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Communities
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#003B7118]">
          <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {community.name}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <Badge variant="secondary">
              <DoorOpen className="h-3.5 w-3.5 mr-1" />
              {community.rooms.length}{" "}
              {community.rooms.length === 1 ? "room" : "rooms"}
            </Badge>
            <Badge variant="secondary">
              <UsersIcon className="h-3.5 w-3.5 mr-1" />
              {community._count.groups}{" "}
              {community._count.groups === 1 ? "group" : "groups"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Community Edit Form */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
            Community Details
          </h3>

          <form
            onSubmit={handleSubmit(onSaveCommunity)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Community Name{" "}
                <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Street Address{" "}
                <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input id="address" {...register("address")} />
              {errors.address && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label
                  htmlFor="city"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  City <span className="text-[var(--color-error)]">*</span>
                </label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="mt-1 text-sm text-[var(--color-error)]">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  State <span className="text-[var(--color-error)]">*</span>
                </label>
                <Input id="state" {...register("state")} />
                {errors.state && (
                  <p className="mt-1 text-sm text-[var(--color-error)]">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="zip"
                  className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
                >
                  ZIP Code{" "}
                  <span className="text-[var(--color-error)]">*</span>
                </label>
                <Input id="zip" {...register("zip")} />
                {errors.zip && (
                  <p className="mt-1 text-sm text-[var(--color-error)]">
                    {errors.zip.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Name */}
            <div>
              <label
                htmlFor="contactName"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Contact Name
              </label>
              <Input
                id="contactName"
                placeholder="Facility contact person"
                {...register("contactName")}
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label
                htmlFor="contactPhone"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Contact Phone
              </label>
              <Input
                id="contactPhone"
                placeholder="(555) 123-4567"
                {...register("contactPhone")}
              />
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Additional information..."
                autoGrow
                {...register("notes")}
              />
            </div>

            {/* Save button */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                size="default"
                disabled={isSaving || !isDirty}
              >
                {isSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              {isDirty && (
                <span className="text-sm text-[var(--color-text-tertiary)]">
                  You have unsaved changes
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rooms Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Rooms
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddRoom(true)}
            >
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </div>

          {community.rooms.length === 0 ? (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center">
              <DoorOpen className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
              <p className="text-base text-[var(--color-text-secondary)] mb-1">
                No rooms added yet
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                Add rooms like &quot;Chapel&quot;, &quot;Activity Room&quot;, or
                &quot;Common Area&quot;.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {community.rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4"
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-bg-card)] shrink-0">
                    <DoorOpen className="h-5 w-5 text-[var(--color-text-tertiary)]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-[var(--color-text-primary)]">
                      {room.name}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap mt-1">
                      {room.capacity && (
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          Capacity: {room.capacity}
                        </span>
                      )}
                      {room.hasProjector && (
                        <Badge variant="secondary" className="text-xs">
                          <Monitor className="h-3 w-3 mr-1" />
                          Projector
                        </Badge>
                      )}
                      {room.notes && (
                        <span className="text-sm text-[var(--color-text-tertiary)]">
                          {room.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)]"
                    onClick={() => setRoomToDelete(room)}
                    aria-label={`Delete room ${room.name}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-[var(--color-error)]/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Removing a community will deactivate it and hide it from the app.
            This action can be undone by a system administrator.
          </p>
          <Button
            variant="destructive"
            size="default"
            onClick={() => setShowDeleteCommunity(true)}
          >
            <Trash2 className="h-5 w-5" />
            Remove Community
          </Button>
        </CardContent>
      </Card>

      {/* Add Room Dialog */}
      <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
            <DialogDescription>
              Add a room or area within {community.name} where services take
              place.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmitRoom((data) =>
              addRoomMutation.mutate(data)
            )}
            className="space-y-5 mt-4"
          >
            <div>
              <label
                htmlFor="roomName"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Room Name{" "}
                <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input
                id="roomName"
                placeholder='e.g., "Chapel", "Activity Room A"'
                {...registerRoom("name")}
              />
              {roomErrors.name && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {roomErrors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="roomCapacity"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Capacity
              </label>
              <Input
                id="roomCapacity"
                type="number"
                placeholder="Number of seats"
                min="1"
                {...registerRoom("capacity")}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="h-6 w-6 rounded-[var(--radius-sm)] border-2 border-[var(--color-border)] accent-[var(--color-primary)] cursor-pointer"
                {...registerRoom("hasProjector")}
              />
              <span className="text-base text-[var(--color-text-primary)]">
                Has projector / display screen
              </span>
            </label>

            <div>
              <label
                htmlFor="roomNotes"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Notes
              </label>
              <Input
                id="roomNotes"
                placeholder="Additional details about this room"
                {...registerRoom("notes")}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetRoom();
                  setShowAddRoom(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addRoomMutation.isPending}
              >
                {addRoomMutation.isPending && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {addRoomMutation.isPending ? "Adding..." : "Add Room"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Room Confirmation Dialog */}
      <Dialog
        open={!!roomToDelete}
        onOpenChange={(open) => {
          if (!open) setRoomToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{roomToDelete?.name}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRoomToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (roomToDelete) {
                  deleteRoomMutation.mutate(roomToDelete.id);
                }
              }}
              disabled={deleteRoomMutation.isPending}
            >
              {deleteRoomMutation.isPending && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              {deleteRoomMutation.isPending ? "Deleting..." : "Delete Room"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Community Confirmation Dialog */}
      <Dialog
        open={showDeleteCommunity}
        onOpenChange={setShowDeleteCommunity}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Community</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;{community.name}&quot;?
              The community will be deactivated and hidden from the app.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteCommunity(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCommunity}
            >
              <Trash2 className="h-5 w-5" />
              Remove Community
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
