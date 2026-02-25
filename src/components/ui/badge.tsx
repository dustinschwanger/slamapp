import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-full)] px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
        secondary:
          "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
        success:
          "bg-[var(--color-success)] text-[var(--color-success-foreground)]",
        warning:
          "bg-[var(--color-warning)] text-[var(--color-warning-foreground)]",
        prayer:
          "bg-[var(--color-prayer)] text-[var(--color-prayer-foreground)]",
        worship:
          "bg-[var(--color-worship)] text-[var(--color-worship-foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
