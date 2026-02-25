"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Shield,
  Building2,
  Loader2,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  churchId: string | null;
  churchName: string | null;
  createdAt: string;
}

interface Church {
  id: string;
  name: string;
}

interface UsersClientProps {
  users: UserData[];
  churches: Church[];
  showUnassigned: boolean;
}

const ROLES = ["super_admin", "admin", "leader", "volunteer", "member"] as const;

export function UsersClient({
  users: initialUsers,
  churches,
  showUnassigned,
}: UsersClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [assignForm, setAssignForm] = useState<{
    churchId: string;
    role: string;
  }>({ churchId: "", role: "member" });

  // Add user form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "member",
    churchId: "",
  });
  const [adding, setAdding] = useState(false);

  const handleAssign = async (userId: string) => {
    if (!assignForm.churchId) {
      toast.error("Please select a church");
      return;
    }
    setAssigning(userId);
    try {
      const res = await fetch(`/api/super-admin/users/${userId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignForm),
      });
      if (res.ok) {
        const data = await res.json();
        const church = churches.find((c) => c.id === assignForm.churchId);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  churchId: assignForm.churchId,
                  churchName: church?.name ?? null,
                  role: data.user.role,
                }
              : u
          )
        );
        toast.success("User assigned successfully");
        setAssigning(null);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to assign user");
        setAssigning(null);
      }
    } catch {
      toast.error("Failed to assign user");
      setAssigning(null);
    }
  };

  const handleAddUser = async () => {
    if (!addForm.firstName.trim() || !addForm.lastName.trim() || !addForm.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/super-admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: addForm.firstName.trim(),
          lastName: addForm.lastName.trim(),
          email: addForm.email.trim().toLowerCase(),
          role: addForm.role,
          churchId: addForm.churchId || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setUsers((prev) => [data.user, ...prev]);
        toast.success(`${addForm.firstName} ${addForm.lastName} has been added`);
        setAddForm({ firstName: "", lastName: "", email: "", role: "member", churchId: "" });
        setShowAddForm(false);
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to add user");
      }
    } catch {
      toast.error("Failed to add user");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            {showUnassigned ? "Unassigned Users" : "All Users"}
          </h1>
          <p className="mt-1 text-base text-text-secondary">
            {users.length} user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/super-admin/users">
            <Button
              variant={showUnassigned ? "outline" : "default"}
              size="sm"
              className="gap-1.5"
            >
              <UserCheck className="h-4 w-4" />
              All
            </Button>
          </Link>
          <Link href="/super-admin/users?unassigned=true">
            <Button
              variant={showUnassigned ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
            >
              <UserX className="h-4 w-4" />
              Unassigned
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <UserPlus className="h-4 w-4" />
            {showAddForm ? "Cancel" : "Add User"}
          </Button>
        </div>
      </div>

      {/* Add user form */}
      {showAddForm && (
        <div className="rounded-[var(--radius-lg)] border border-border bg-bg-card shadow-[var(--shadow-sm)] p-5 mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Add New User
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="First name *"
              value={addForm.firstName}
              onChange={(e) => setAddForm((p) => ({ ...p, firstName: e.target.value }))}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-border bg-bg-primary text-base text-text-primary focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <input
              type="text"
              placeholder="Last name *"
              value={addForm.lastName}
              onChange={(e) => setAddForm((p) => ({ ...p, lastName: e.target.value }))}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-border bg-bg-primary text-base text-text-primary focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <input
              type="email"
              placeholder="Email address *"
              value={addForm.email}
              onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-border bg-bg-primary text-base text-text-primary focus:outline-3 focus:outline-[var(--color-ring)] focus:outline-offset-2"
            />
            <select
              value={addForm.role}
              onChange={(e) => setAddForm((p) => ({ ...p, role: e.target.value }))}
              className="px-3 py-2 rounded-[var(--radius-md)] border border-border bg-bg-primary text-base text-text-primary"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Assign to church (optional)
            </label>
            <select
              value={addForm.churchId}
              onChange={(e) => setAddForm((p) => ({ ...p, churchId: e.target.value }))}
              className="w-full sm:w-1/2 px-3 py-2 rounded-[var(--radius-md)] border border-border bg-bg-primary text-base text-text-primary"
            >
              <option value="">No church (unassigned)</option>
              {churches.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <Button onClick={handleAddUser} disabled={adding} className="gap-1.5">
              {adding && <Loader2 className="h-4 w-4 animate-spin" />}
              Add User
            </Button>
          </div>
        </div>
      )}

      {users.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-border bg-bg-card p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-text-tertiary" />
          <h3 className="mt-4 text-lg font-semibold text-text-primary">
            {showUnassigned ? "No unassigned users" : "No users yet"}
          </h3>
          <p className="mt-2 text-base text-text-secondary">
            {showUnassigned
              ? "All users have been assigned to a church."
              : "Users will appear here after they sign up."}
          </p>
        </div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-border bg-bg-card shadow-[var(--shadow-sm)] divide-y divide-border">
          {users.map((user) => {
            const isExpanded = assigning === user.id;
            return (
              <div key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-bg-secondary text-text-secondary font-medium">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-text-tertiary">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {user.churchName ? (
                      <Badge variant="default" className="gap-1">
                        <Building2 className="h-3 w-3" />
                        {user.churchName}
                      </Badge>
                    ) : (
                      <Badge variant="warning">Unassigned</Badge>
                    )}
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (isExpanded) {
                          setAssigning(null);
                        } else {
                          setAssigning(user.id);
                          setAssignForm({
                            churchId: user.churchId ?? "",
                            role: user.role,
                          });
                        }
                      }}
                    >
                      {isExpanded ? "Cancel" : "Assign"}
                    </Button>
                  </div>
                </div>

                {/* Assign form */}
                {isExpanded && (
                  <div className="mt-4 ml-13 flex items-end gap-3 p-4 rounded-[var(--radius-md)] bg-bg-secondary">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Church
                      </label>
                      <select
                        value={assignForm.churchId}
                        onChange={(e) =>
                          setAssignForm((p) => ({
                            ...p,
                            churchId: e.target.value,
                          }))
                        }
                        className={cn(
                          "w-full h-10 rounded-[var(--radius-md)] border border-border bg-bg-card px-3 text-sm text-text-primary"
                        )}
                      >
                        <option value="">Select a church...</option>
                        {churches.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-40">
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Role
                      </label>
                      <select
                        value={assignForm.role}
                        onChange={(e) =>
                          setAssignForm((p) => ({
                            ...p,
                            role: e.target.value,
                          }))
                        }
                        className={cn(
                          "w-full h-10 rounded-[var(--radius-md)] border border-border bg-bg-card px-3 text-sm text-text-primary"
                        )}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      onClick={() => handleAssign(user.id)}
                      disabled={!assignForm.churchId}
                      className="gap-1.5"
                    >
                      <Loader2
                        className={cn(
                          "h-4 w-4 animate-spin",
                          assigning !== user.id && "hidden"
                        )}
                      />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
