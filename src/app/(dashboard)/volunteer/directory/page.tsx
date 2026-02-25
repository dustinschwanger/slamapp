"use client";

import * as React from "react";
import { Calendar, Users, Loader2, Mail, Phone, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChurch } from "@/components/providers/ChurchProvider";
import { toast } from "sonner";

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

export default function VolunteerDirectoryPage() {
  const { userRole } = useChurch();
  const [users, setUsers] = React.useState<DirectoryUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isAdmin = userRole === "admin" || userRole === "super_admin";

  const fetchUsers = React.useCallback(async () => {
    try {
      const res = await fetch("/api/volunteers/directory");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.volunteers ?? []);
      }
    } catch {
      // API not available
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/volunteers/directory/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
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
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        toast.success(`${user.name} has been removed`);
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to remove user");
      }
    } catch {
      toast.error("Failed to remove user");
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D4F18]">
          <Calendar className="h-5 w-5 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          Directory
        </h2>
      </div>

      <p className="text-base text-[var(--color-text-secondary)] mb-6">
        {loading
          ? "Loading members..."
          : `${users.length} member${users.length !== 1 ? "s" : ""} in your church.`}
      </p>

      {/* User list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-success" />
        </div>
      ) : users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
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
            Members will appear here once they join the church.
          </p>
        </div>
      )}
    </div>
  );
}

function UserCard({
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
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar size="lg" className="shrink-0">
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">
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

          {/* Contact */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-secondary)] mb-2">
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

          {/* Groups */}
          {user.groups.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {user.groups.map((group, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {group}
                </Badge>
              ))}
            </div>
          )}

          {/* Joined date */}
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
            Joined{" "}
            {new Date(user.joinedDate + "T00:00:00").toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            )}
          </p>
        </div>

        {/* Admin actions */}
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
