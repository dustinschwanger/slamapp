"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  MessageCircle,
  Loader2,
  UserPlus,
  UserMinus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useChurch } from "@/components/providers/ChurchProvider";
import type { Group } from "@/lib/types";

interface GroupMember {
  id: string;
  userId: string;
  groupRole: string;
  firstName: string;
  lastName: string;
  email: string;
  appRole: string;
  avatarUrl: string | null;
  joinedAt: string;
}

interface ChurchUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const { userId, userRole } = useChurch();

  const [group, setGroup] = React.useState<Group | null>(null);
  const [members, setMembers] = React.useState<GroupMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [showAddMember, setShowAddMember] = React.useState(false);
  const [churchUsers, setChurchUsers] = React.useState<ChurchUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);
  const [addingUserId, setAddingUserId] = React.useState<string | null>(null);

  const [memberToRemove, setMemberToRemove] = React.useState<GroupMember | null>(null);
  const [isRemoving, setIsRemoving] = React.useState(false);

  const [showDeleteGroup, setShowDeleteGroup] = React.useState(false);

  const canManage =
    userRole === "admin" ||
    userRole === "leader" ||
    userRole === "super_admin";
  const canDelete = userRole === "admin" || userRole === "super_admin";

  const fetchGroupData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [groupRes, membersRes] = await Promise.all([
        fetch(`/api/groups/${groupId}`),
        fetch(`/api/groups/${groupId}/members`),
      ]);

      if (!groupRes.ok) {
        const data = await groupRes.json();
        throw new Error(data.error || "Failed to load group");
      }

      if (!membersRes.ok) {
        const data = await membersRes.json();
        throw new Error(data.error || "Failed to load members");
      }

      const groupData: Group = await groupRes.json();
      const membersData: GroupMember[] = await membersRes.json();

      setGroup(groupData);
      setMembers(membersData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load group";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  React.useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const handleOpenAddMember = async () => {
    setShowAddMember(true);
    setIsLoadingUsers(true);

    try {
      const res = await fetch("/api/super-admin/users");
      if (res.ok) {
        const data = await res.json();
        setChurchUsers(Array.isArray(data) ? data : data.users ?? []);
      }
    } catch {
      // Fallback: users list may not be available to non-super-admins
      // In that case the dialog still opens but shows no users
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleAddMember = async (targetUserId: string) => {
    setAddingUserId(targetUserId);

    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: targetUserId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add member");
      }

      toast.success("Member added successfully");
      setShowAddMember(false);
      fetchGroupData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add member";
      toast.error(message);
    } finally {
      setAddingUserId(null);
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    setIsRemoving(true);

    try {
      const res = await fetch(`/api/groups/${groupId}/members`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: memberToRemove.userId }),
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        throw new Error(data.error || "Failed to remove member");
      }

      toast.success("Member removed successfully");
      setMemberToRemove(null);
      fetchGroupData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to remove member";
      toast.error(message);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete group");
      }

      toast.success("Group removed successfully");
      router.push("/groups");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete group";
      toast.error(message);
    }
  };

  function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  // Loading
  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <Link href="/groups" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading group...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !group) {
    return (
      <div className="max-w-3xl">
        <Link href="/groups" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">
            {error || "Group not found."}
          </p>
        </div>
      </div>
    );
  }

  // Filter out users who are already members
  const memberUserIds = new Set(members.map((m) => m.userId));
  const availableUsers = churchUsers.filter(
    (u) => !memberUserIds.has(u.id)
  );

  return (
    <div className="max-w-3xl">
      {/* Back button */}
      <Link href="/groups" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Groups
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D6A18]">
            <Users className="h-5 w-5 text-[#2E7D6A]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {group.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="secondary">
                <Users className="h-3.5 w-3.5 mr-1" />
                {group.memberCount}{" "}
                {group.memberCount === 1 ? "member" : "members"}
              </Badge>
            </div>
          </div>
        </div>

        <Link href={`/groups/${groupId}/chat`}>
          <Button variant="default" size="default">
            <MessageCircle className="h-4 w-4" />
            Group Chat
          </Button>
        </Link>
      </div>

      {/* Group Info Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
            Group Details
          </h3>

          {group.description && (
            <p className="text-base text-[var(--color-text-secondary)] mb-4">
              {group.description}
            </p>
          )}

          <div className="space-y-3">
            {group.meetingDay && group.meetingTime && (
              <div className="flex items-center gap-3 text-base text-[var(--color-text-secondary)]">
                <Clock className="h-5 w-5 shrink-0 text-[var(--color-text-tertiary)]" />
                <span>
                  {group.meetingDay} at {group.meetingTime}
                </span>
              </div>
            )}
            {group.communityName && (
              <div className="flex items-center gap-3 text-base text-[var(--color-text-secondary)]">
                <MapPin className="h-5 w-5 shrink-0 text-[var(--color-text-tertiary)]" />
                <div>
                  <span>{group.communityName}</span>
                  {group.communityAddress && (
                    <span className="block text-sm text-[var(--color-text-tertiary)]">
                      {group.communityAddress}
                    </span>
                  )}
                </div>
              </div>
            )}
            {group.leaderName && (
              <div className="text-base text-[var(--color-text-secondary)]">
                Led by{" "}
                <span className="font-medium text-[var(--color-text-primary)]">
                  {group.leaderName}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Members Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Members
            </h3>
            {canManage && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenAddMember}
              >
                <UserPlus className="h-4 w-4" />
                Add Member
              </Button>
            )}
          </div>

          {members.length === 0 ? (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-8 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
              <p className="text-base text-[var(--color-text-secondary)]">
                No members yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4"
                >
                  <Avatar size="default" className="shrink-0">
                    <AvatarFallback>
                      {getInitials(member.firstName, member.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-[var(--color-text-primary)]">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {member.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {member.groupRole === "leader" && (
                      <Badge variant="secondary">Leader</Badge>
                    )}
                    {canManage && member.userId !== userId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)]"
                        onClick={() => setMemberToRemove(member)}
                        aria-label={`Remove ${member.firstName} ${member.lastName}`}
                      >
                        <UserMinus className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone - Admin only */}
      {canDelete && (
        <Card className="border-[var(--color-error)]/30">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Removing a group will deactivate it and hide it from the app.
              All group messages will be preserved.
            </p>
            <Button
              variant="destructive"
              size="default"
              onClick={() => setShowDeleteGroup(true)}
            >
              <Trash2 className="h-5 w-5" />
              Remove Group
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>
              Select a church member to add to {group.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {isLoadingUsers ? (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 mx-auto mb-2 text-[var(--color-text-tertiary)] animate-spin" />
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Loading users...
                </p>
              </div>
            ) : availableUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {churchUsers.length === 0
                    ? "Unable to load users. You may not have permission to view the user list."
                    : "All church members are already in this group."}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                  >
                    <Avatar size="default" className="shrink-0">
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-[var(--color-text-primary)]">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)] truncate">
                        {user.email}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={addingUserId === user.id}
                      onClick={() => handleAddMember(user.id)}
                    >
                      {addingUserId === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <UserPlus className="h-4 w-4" />
                      )}
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMember(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation Dialog */}
      <Dialog
        open={!!memberToRemove}
        onOpenChange={(open) => {
          if (!open) setMemberToRemove(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              {memberToRemove
                ? `${memberToRemove.firstName} ${memberToRemove.lastName}`
                : ""}{" "}
              from this group?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberToRemove(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveMember}
              disabled={isRemoving}
            >
              {isRemoving && <Loader2 className="h-5 w-5 animate-spin" />}
              {isRemoving ? "Removing..." : "Remove Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Group Confirmation Dialog */}
      <Dialog open={showDeleteGroup} onOpenChange={setShowDeleteGroup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;{group.name}&quot;? The
              group will be deactivated and hidden from the app.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteGroup(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              <Trash2 className="h-5 w-5" />
              Remove Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
