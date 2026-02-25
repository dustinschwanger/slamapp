"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, CalendarOff, Plus, Loader2, UserPlus, Users, Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VolunteerCalendar } from "@/components/volunteer/VolunteerCalendar";
import { ShiftCard } from "@/components/volunteer/ShiftCard";
import { useChurch } from "@/components/providers/ChurchProvider";
import type { Shift } from "@/lib/types";

interface DirectoryUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  groups: string[];
  initials: string;
  joinedDate: string;
  isPending: boolean;
}

const ROLE_BADGE_COLORS: Record<string, string> = {
  admin: "var(--color-error)",
  leader: "var(--color-primary)",
  volunteer: "var(--color-success)",
  member: "var(--color-text-secondary)",
};

export default function VolunteerPage() {
  const { userId, userRole } = useChurch();
  const [shifts, setShifts] = React.useState<Shift[]>([]);
  const [loading, setLoading] = React.useState(true);

  const isAdmin = userRole === "admin" || userRole === "super_admin";
  const canCreateShift = userRole === "admin" || userRole === "leader" || userRole === "super_admin";
  const canInvite = userRole === "admin" || userRole === "leader" || userRole === "super_admin";
  const [members, setMembers] = React.useState<DirectoryUser[]>([]);
  const [membersLoading, setMembersLoading] = React.useState(true);
  const [showInviteForm, setShowInviteForm] = React.useState(false);
  const [inviteFirstName, setInviteFirstName] = React.useState("");
  const [inviteLastName, setInviteLastName] = React.useState("");
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState("volunteer");
  const [inviting, setInviting] = React.useState(false);

  const handleInvite = async () => {
    if (!inviteFirstName.trim() || !inviteLastName.trim() || !inviteEmail.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setInviting(true);
    try {
      const res = await fetch("/api/volunteers/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: inviteFirstName.trim(),
          lastName: inviteLastName.trim(),
          email: inviteEmail.trim().toLowerCase(),
          role: inviteRole,
        }),
      });
      if (res.ok) {
        toast.success(`${inviteFirstName} ${inviteLastName} has been added`);
        setInviteFirstName("");
        setInviteLastName("");
        setInviteEmail("");
        setInviteRole("volunteer");
        setShowInviteForm(false);
        fetchMembers();
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to add user");
      }
    } catch {
      toast.error("Failed to add user");
    } finally {
      setInviting(false);
    }
  };

  const fetchMembers = React.useCallback(async () => {
    try {
      const res = await fetch("/api/volunteers/directory");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.volunteers ?? []);
      }
    } catch {
      // API not available
    } finally {
      setMembersLoading(false);
    }
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/volunteers/directory/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setMembers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        toast.success("Role updated");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to update role");
      }
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleRemove = async (user: DirectoryUser) => {
    if (!confirm(`Remove ${user.name} from the church?`)) return;
    try {
      const res = await fetch(`/api/volunteers/directory/${user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers((prev) => prev.filter((u) => u.id !== user.id));
        toast.success(`${user.name} has been removed`);
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to remove user");
      }
    } catch {
      toast.error("Failed to remove user");
    }
  };

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
    fetchMembers();
  }, [fetchShifts, fetchMembers]);

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
            Volunteers
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {canInvite && (
            <Button
              variant="outline"
              size="default"
              onClick={() => setShowInviteForm(!showInviteForm)}
            >
              <UserPlus className="h-5 w-5" />
              {showInviteForm ? "Cancel" : "Add User"}
            </Button>
          )}
          {canCreateShift && (
            <Link href="/volunteer/shifts/create">
              <Button variant="default" size="default">
                <Plus className="h-5 w-5" />
                Create Shift
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Add User Form */}
      {showInviteForm && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 mb-6">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            Add User to Church
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="First name"
              value={inviteFirstName}
              onChange={(e) => setInviteFirstName(e.target.value)}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <input
              type="text"
              placeholder="Last name"
              value={inviteLastName}
              onChange={(e) => setInviteLastName(e.target.value)}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <input
              type="email"
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)] focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-base text-[var(--color-text-primary)]"
            >
              <option value="member">Member</option>
              <option value="volunteer">Volunteer</option>
              <option value="leader">Leader</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-4">
            <Button size="default" onClick={handleInvite} disabled={inviting}>
              {inviting && <Loader2 className="h-4 w-4 animate-spin" />}
              Add User
            </Button>
          </div>
        </div>
      )}

      {/* Members */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Members
        </h3>
        {membersLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-success" />
          </div>
        ) : members.length > 0 ? (
          <div className="space-y-3">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                user={member}
                isAdmin={isAdmin}
                onRoleChange={handleRoleChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
            <Users className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
            <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
              No members yet
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Use the &quot;Add User&quot; button to add members to your church.
            </p>
          </div>
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

function MemberCard({
  user,
  isAdmin,
  onRoleChange,
  onRemove,
}: {
  user: DirectoryUser;
  isAdmin: boolean;
  onRoleChange: (userId: string, role: string) => void;
  onRemove: (user: DirectoryUser) => void;
}) {
  const roleColor = ROLE_BADGE_COLORS[user.role] ?? "var(--color-text-secondary)";

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-4">
      <div className="flex items-center gap-3">
        <Avatar size="default" className="shrink-0">
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              {user.name}
            </span>
            {isAdmin ? (
              <select
                value={user.role}
                onChange={(e) => onRoleChange(user.id, e.target.value)}
                className="px-2 py-0.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-xs font-medium text-[var(--color-text-primary)]"
              >
                <option value="member">Member</option>
                <option value="volunteer">Volunteer</option>
                <option value="leader">Leader</option>
                <option value="admin">Admin</option>
              </select>
            ) : (
              <Badge
                className="text-xs text-white"
                style={{ backgroundColor: roleColor }}
              >
                {user.role}
              </Badge>
            )}
            {user.isPending && (
              <Badge variant="secondary" className="text-xs">
                Pending signup
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-[var(--color-text-secondary)] mt-0.5">
            {user.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
                {user.email}
              </span>
            )}
            {user.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
                {user.phone}
              </span>
            )}
          </div>
        </div>

        {isAdmin && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(user)}
            className="shrink-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)]"
            aria-label={`Remove ${user.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
