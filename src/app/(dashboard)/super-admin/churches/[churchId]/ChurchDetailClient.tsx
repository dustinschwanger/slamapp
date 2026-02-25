"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Phone,
  Globe,
  MapPin,
  Users,
  Shield,
  Loader2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ChurchData {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  website: string | null;
  isActive: boolean;
  createdAt: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  createdAt: string;
}

interface ChurchDetailClientProps {
  church: ChurchData;
  users: UserData[];
  counts: { users: number; communities: number; groups: number };
}

const ROLE_COLORS: Record<string, string> = {
  admin: "default",
  leader: "success",
  volunteer: "secondary",
  member: "secondary",
};

export function ChurchDetailClient({
  church,
  users,
  counts,
}: ChurchDetailClientProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: church.name,
    address: church.address ?? "",
    city: church.city ?? "",
    state: church.state ?? "",
    zip: church.zip ?? "",
    phone: church.phone ?? "",
    website: church.website ?? "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/super-admin/churches/${church.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Church updated");
        setEditing(false);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update");
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Church Info */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)] p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-[var(--radius-md)] bg-[#003B7118]">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {church.name}
              </h1>
              <code className="text-sm text-text-tertiary">{church.slug}</code>
            </div>
          </div>
          <Badge variant={church.isActive ? "success" : "secondary"}>
            {church.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-[var(--radius-md)] bg-bg-secondary">
            <p className="text-2xl font-bold text-text-primary">
              {counts.users}
            </p>
            <p className="text-sm text-text-secondary">Users</p>
          </div>
          <div className="text-center p-3 rounded-[var(--radius-md)] bg-bg-secondary">
            <p className="text-2xl font-bold text-text-primary">
              {counts.communities}
            </p>
            <p className="text-sm text-text-secondary">Communities</p>
          </div>
          <div className="text-center p-3 rounded-[var(--radius-md)] bg-bg-secondary">
            <p className="text-2xl font-bold text-text-primary">
              {counts.groups}
            </p>
            <p className="text-sm text-text-secondary">Groups</p>
          </div>
        </div>

        {/* Details */}
        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Name
              </label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  City
                </label>
                <Input
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  State
                </label>
                <Input
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, state: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Zip
                </label>
                <Input
                  value={form.zip}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, zip: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Address
              </label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Phone
                </label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Website
                </label>
                <Input
                  value={form.website}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, website: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {(church.city || church.state) && (
              <p className="flex items-center gap-2 text-text-secondary">
                <MapPin className="h-4 w-4" />
                {[church.address, church.city, church.state, church.zip]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            {church.phone && (
              <p className="flex items-center gap-2 text-text-secondary">
                <Phone className="h-4 w-4" />
                {church.phone}
              </p>
            )}
            {church.website && (
              <p className="flex items-center gap-2 text-text-secondary">
                <Globe className="h-4 w-4" />
                {church.website}
              </p>
            )}
            <div className="pt-3">
              <Button variant="outline" onClick={() => setEditing(true)}>
                Edit Details
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Users */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)]">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Church Members ({users.length})
          </h2>
        </div>
        {users.length === 0 ? (
          <div className="p-6 text-center text-text-secondary">
            No users assigned to this church yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-bg-surface transition-colors"
              >
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
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      (ROLE_COLORS[user.role] as "default" | "success" | "secondary") ??
                      "secondary"
                    }
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
