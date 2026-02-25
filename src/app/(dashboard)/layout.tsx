import { redirect } from "next/navigation";
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

  // User not assigned to a church yet (super admins can bypass this)
  if (authContext && !authContext.churchId && !authContext.isSuperAdmin) {
    return (
      <div className="flex min-h-screen bg-bg-primary items-center justify-center">
        <div className="max-w-md text-center p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Welcome, {authContext.firstName}!
          </h1>
          <p className="text-text-secondary text-lg">
            Your account has been created. A church administrator needs to
            assign you to a church before you can access the app.
          </p>
          <p className="text-text-tertiary mt-4">
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
