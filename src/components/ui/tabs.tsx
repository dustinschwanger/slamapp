"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({
  activeTab: "",
  setActiveTab: () => {},
});

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, defaultValue, value: controlledValue, onValueChange, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const activeTab = controlledValue ?? internalValue;
    const setActiveTab = onValueChange ?? setInternalValue;

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={cn("w-full", className)} {...props} />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "inline-flex w-full items-center gap-1 rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, onKeyDown, ...props }, ref) => {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);
    const isActive = activeTab === value;
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const tablist = triggerRef.current?.closest('[role="tablist"]');
        if (!tablist) return;

        const tabs = Array.from(
          tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        );
        const currentIndex = tabs.indexOf(triggerRef.current!);

        let nextIndex: number | null = null;

        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          nextIndex = 0;
        } else if (e.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          tabs[nextIndex].focus();
          tabs[nextIndex].click();
        }

        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    return (
      <button
        ref={setRefs}
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "inline-flex min-h-[48px] flex-1 items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-4 text-base font-medium transition-colors duration-[var(--duration-normal)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2",
          isActive
            ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          className
        )}
        onClick={(e) => {
          setActiveTab(value);
          onClick?.(e);
        }}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab } = React.useContext(TabsContext);
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn("mt-4 focus-visible:outline-none", className)}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
