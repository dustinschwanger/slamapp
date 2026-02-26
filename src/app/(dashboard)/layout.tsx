import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { ChurchProvider } from "@/components/providers/ChurchProvider";
import { getAuthContext } from "@/lib/auth/context";
import { AuthError } from "@/lib/auth/api-utils";
import type { UserRole } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authContext: {
    userId: string;
    churchId: string | null;
    role: UserRole;
    firstName: string;
    lastName: string;
    churchName: string | null;
    isSuperAdmin: boolean;
  } | null = null;

  try {
    authContext = await getAuthContext();
  } catch (error) {
    if (error instanceof AuthError && error.status === 401) {
      redirect("/sign-in");
    }
    // For other auth errors, show the layout but children will handle it
  }

  // User not assigned to a church yet (super admins and anonymous users can bypass this)
  const isAnonymous = authContext?.userId === "anonymous";
  if (authContext && !authContext.churchId && !authContext.isSuperAdmin && !isAnonymous) {
    return (
      <div className="flex min-h-screen bg-bg-primary items-center justify-center p-4">
        <div className="max-w-md text-center rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-lg)] p-8">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[var(--color-primary)]10 mx-auto mb-5">
            <BookOpen className="h-7 w-7 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Welcome, {authContext.firstName}!
          </h1>
          <p className="text-text-secondary text-base leading-relaxed mb-4">
            SLAM helps your team plan and coordinate nursing home ministry
            visits — from worship songs and Bible lessons to prayer requests
            and scheduling.
          </p>
          <p className="text-text-secondary text-base leading-relaxed">
            Your account has been created. A church administrator needs to
            assign you to a church before you can access the app.
          </p>
          <p className="text-text-tertiary mt-4 text-sm">
            Please contact your church administrator or check back later.
          </p>
        </div>
      </div>
    );
  }

  const churchValue = authContext
    ? {
        churchId: authContext.churchId ?? "",
        churchName: authContext.churchName ?? "",
        userId: authContext.userId,
        userRole: authContext.role,
        userName: `${authContext.firstName} ${authContext.lastName}`,
      }
    : null;

  const content = (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>

        <BottomNav />
      </div>
    </div>
  );

  if (churchValue) {
    return <ChurchProvider value={churchValue}>{content}</ChurchProvider>;
  }

  return content;
}
