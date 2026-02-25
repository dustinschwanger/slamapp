import Link from "next/link";
import { Building2, Users, UserX } from "lucide-react";
import { db } from "@/lib/db";

export default async function SuperAdminDashboard() {
  const [churchCount, userCount, unassignedCount] = await Promise.all([
    db.church.count({ where: { isActive: true } }),
    db.user.count(),
    db.user.count({ where: { churchId: null, role: { not: "super_admin" } } }),
  ]);

  const stats = [
    {
      label: "Total Churches",
      count: churchCount,
      icon: Building2,
      href: "/super-admin/churches",
      color: "#003B71",
    },
    {
      label: "Total Users",
      count: userCount,
      icon: Users,
      href: "/super-admin/users",
      color: "#2E7D4F",
    },
    {
      label: "Unassigned Users",
      count: unassignedCount,
      icon: UserX,
      href: "/super-admin/users?unassigned=true",
      color: "#B8860B",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Platform Overview
        </h1>
        <p className="mt-1 text-base text-[var(--color-text-secondary)]">
          Manage churches and users across the SLAM platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="group block">
              <div className="relative overflow-hidden min-h-[140px] rounded-[var(--radius-lg)] bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 ease-out group-hover:-translate-y-0.5">
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="p-5 pl-6">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)]"
                      style={{ backgroundColor: `${stat.color}18` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                  </div>

                  <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
                    {stat.count}
                  </p>
                  <p className="text-base text-[var(--color-text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
