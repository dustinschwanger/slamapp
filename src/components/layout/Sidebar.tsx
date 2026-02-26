"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ClipboardList,
  Music,
  BookOpen,
  Users,
  Heart,
  MessageCircleHeart,
  Calendar,
  BarChart3,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Building2,
  Church,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useChurch } from "@/components/providers/ChurchProvider";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Visit Guide", href: "/visit-guide", icon: MessageCircleHeart },
  { label: "Services", href: "/services", icon: ClipboardList },
  { label: "Worship", href: "/worship", icon: Music },
  { label: "Lessons", href: "/reading", icon: BookOpen },
  { label: "Groups", href: "/groups", icon: Users },
  { label: "Prayer", href: "/prayer", icon: Heart },
  { label: "Volunteers", href: "/volunteer", icon: Calendar },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Communities", href: "/admin/communities", icon: Building2 },
];

const superAdminItems = [
  { label: "Churches", href: "/super-admin/churches", icon: Church },
  { label: "Users", href: "/super-admin/users", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { userRole } = useChurch();
  const isSuperAdmin = userRole === "super_admin";
  const allItems = isSuperAdmin ? [...navItems, ...superAdminItems] : navItems;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-bg-card border-r border-border sticky top-0 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-3 border-b border-border">
        <Link href="/" className="flex items-center justify-center">
          {collapsed ? (
            <span className="font-display text-2xl font-bold text-primary shrink-0">
              S
            </span>
          ) : (
            <Image
              src="/images/logo.png"
              alt="Senior Living Alliance Ministry"
              width={2097}
              height={489}
              className="w-full max-w-[210px] h-auto"
              priority
            />
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {allItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-200",
                "hover:bg-bg-secondary",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "text-text-secondary",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border text-text-tertiary hover:text-text-primary hover:bg-bg-secondary transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </aside>
  );
}
