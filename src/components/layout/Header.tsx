"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const hubTitles: Record<string, string> = {
  "/": "Dashboard",
  "/worship": "Worship Hub",
  "/reading": "Reading Hub",
  "/groups": "Group Hub",
  "/prayer": "Prayer Requests",
  "/visit-guide": "Visit Guide",
  "/volunteer": "Volunteers",
  "/admin": "Admin Hub",
};

function getPageTitle(pathname: string): string {
  if (hubTitles[pathname]) return hubTitles[pathname];

  // Check for nested routes
  for (const [route, title] of Object.entries(hubTitles)) {
    if (route !== "/" && pathname.startsWith(route)) return title;
  }

  return "SLAM";
}

function isInsideHub(pathname: string): boolean {
  return pathname !== "/" && pathname !== "";
}

export function Header() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const showBack = isInsideHub(pathname);

  return (
    <header
      className={cn(
        "flex items-center gap-3 h-16 px-4 md:px-6 bg-bg-card border-b border-border sticky top-0 z-40"
      )}
    >
      {showBack && (
        <Link
          href="/"
          className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
      )}

      <div className="flex-1 min-w-0">
        {showBack && (
          <p className="text-[12px] text-text-tertiary leading-tight">
            Dashboard
          </p>
        )}
        <h1 className="text-lg font-semibold text-text-primary truncate">
          {title}
        </h1>
      </div>

      {/* Placeholder for Clerk UserButton - will be replaced with actual auth component */}
      <div className="h-9 w-9 rounded-full bg-bg-secondary border border-border" />
    </header>
  );
}
