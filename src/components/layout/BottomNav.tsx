"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Music,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Services", href: "/services", icon: ClipboardList },
  { label: "Worship", href: "/worship", icon: Music },
  { label: "Prayer", href: "/prayer", icon: Heart },
  { label: "More", href: "/more", icon: MoreHorizontal },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-border h-16 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
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
                "flex flex-col items-center justify-center gap-1 min-w-[48px] py-1 transition-colors",
                isActive ? "text-primary" : "text-text-tertiary"
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[12px] leading-tight font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
