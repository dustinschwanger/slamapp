import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accentColor: string;
  count?: number;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  accentColor,
  count,
}: DashboardCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div
        className={cn(
          "relative overflow-hidden h-full min-h-[140px] rounded-[var(--radius-lg)] bg-bg-card border border-border",
          "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
          "transition-all duration-300 ease-out",
          "group-hover:-translate-y-0.5"
        )}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: accentColor }}
        />

        <div className="p-5 pl-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)]"
              style={{ backgroundColor: `${accentColor}18` }}
            >
              <Icon className="h-5 w-5" style={{ color: accentColor }} />
            </div>

            {count !== undefined && count > 0 && (
              <span
                className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-[13px] font-semibold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {count}
              </span>
            )}
          </div>

          <h3 className="text-[20px] font-bold text-text-primary mb-1">
            {title}
          </h3>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
