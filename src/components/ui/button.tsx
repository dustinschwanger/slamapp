"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-medium transition-colors duration-[var(--duration-normal)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-hover)]",
        outline:
          "border-2 border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]",
        ghost:
          "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]",
        destructive:
          "bg-[var(--color-error)] text-[var(--color-error-foreground)] hover:bg-[var(--color-error-hover)]",
        worship:
          "bg-[var(--color-worship)] text-[var(--color-worship-foreground)] hover:bg-[var(--color-worship-hover)]",
        prayer:
          "bg-[var(--color-prayer)] text-[var(--color-prayer-foreground)] hover:bg-[var(--color-prayer-hover)]",
      },
      size: {
        sm: "h-10 min-w-[48px] px-4 text-sm",
        default: "h-12 min-w-[48px] px-6 text-base",
        lg: "h-14 min-w-[48px] px-8 text-lg",
        xl: "h-16 min-w-[48px] px-10 text-xl",
        icon: "h-12 w-12 min-w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
