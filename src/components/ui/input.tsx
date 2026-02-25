import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] placeholder:text-[var(--color-text-tertiary)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
