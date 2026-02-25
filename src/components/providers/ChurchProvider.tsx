"use client";

import { createContext, useContext } from "react";
import type { UserRole } from "@/lib/types";

interface ChurchContextValue {
  churchId: string;
  churchName: string;
  userId: string;
  userRole: UserRole;
  userName: string;
}

const ChurchContext = createContext<ChurchContextValue | null>(null);

interface ChurchProviderProps {
  children: React.ReactNode;
  value: ChurchContextValue;
}

export function ChurchProvider({ children, value }: ChurchProviderProps) {
  return (
    <ChurchContext.Provider value={value}>{children}</ChurchContext.Provider>
  );
}

const defaultValue: ChurchContextValue = {
  churchId: "",
  churchName: "",
  userId: "",
  userRole: "member",
  userName: "",
};

export function useChurch(): ChurchContextValue {
  const ctx = useContext(ChurchContext);
  return ctx ?? defaultValue;
}

export function useChurchId(): string {
  return useChurch().churchId;
}

export function useUserRole(): UserRole {
  return useChurch().userRole;
}

export function useUserId(): string {
  return useChurch().userId;
}
