import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { AuthError } from "./api-utils";
import type { UserRole } from "@/lib/types";

export interface ResolvedAuth {
  userId: string;
  clerkId: string;
  churchId: string | null;
  role: UserRole;
  firstName: string;
  lastName: string;
  churchName: string | null;
  isSuperAdmin: boolean;
}

export interface SuperAdminContext extends ResolvedAuth {
  role: "super_admin";
  isSuperAdmin: true;
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 4,
  admin: 3,
  leader: 2,
  volunteer: 1,
  member: 0,
};

/**
 * Gets the full auth context: Clerk auth → DB user lookup → resolved context.
 * Throws AuthError(401) if not authenticated.
 * Returns context with nullable churchId (super_admins have null churchId).
 */
export async function getAuthContext(): Promise<ResolvedAuth> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new AuthError("Not authenticated", 401);
  }

  const user = await db.user.findUnique({
    where: { clerkId },
    include: {
      church: { select: { id: true, name: true } },
    },
  });

  if (!user) {
    // User exists in Clerk but not in DB yet — may happen before webhook fires.
    // Auto-create from Clerk data.
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new AuthError("User not found", 403);
    }

    const newUser = await db.user.create({
      data: {
        clerkId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        phone: clerkUser.phoneNumbers[0]?.phoneNumber ?? null,
        avatarUrl: clerkUser.imageUrl,
        role: "member",
      },
      include: {
        church: { select: { id: true, name: true } },
      },
    });

    return {
      userId: newUser.id,
      clerkId,
      churchId: null,
      role: "member" as UserRole,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      churchName: null,
      isSuperAdmin: false,
    };
  }

  const role = user.role as UserRole;

  return {
    userId: user.id,
    clerkId,
    churchId: user.churchId,
    role,
    firstName: user.firstName,
    lastName: user.lastName,
    churchName: user.church?.name ?? null,
    isSuperAdmin: role === "super_admin",
  };
}

/**
 * Gets auth context and verifies the user has at least the given role.
 * Super admins pass all role checks.
 */
export async function requireRole(minimumRole: UserRole): Promise<ResolvedAuth> {
  const ctx = await getAuthContext();

  if (ctx.isSuperAdmin) return ctx;

  if (ROLE_HIERARCHY[ctx.role] < ROLE_HIERARCHY[minimumRole]) {
    throw new AuthError(
      `Insufficient permissions. Required: ${minimumRole}, Current: ${ctx.role}`,
      403
    );
  }

  return ctx;
}

/**
 * Requires super_admin role specifically.
 */
export async function requireSuperAdmin(): Promise<SuperAdminContext> {
  const ctx = await getAuthContext();

  if (!ctx.isSuperAdmin) {
    throw new AuthError("Super admin access required", 403);
  }

  return ctx as SuperAdminContext;
}

/**
 * Resolves the churchId for queries:
 * - Regular users: always returns their own churchId (ignores param)
 * - Super admins: returns the requested churchId (must be provided)
 * Throws if no churchId can be resolved.
 */
export async function getQueryChurchId(
  requestedChurchId?: string | null
): Promise<string> {
  const ctx = await getAuthContext();

  if (ctx.isSuperAdmin) {
    if (!requestedChurchId) {
      throw new AuthError(
        "Super admins must specify a churchId for scoped queries",
        400
      );
    }
    // Validate the church exists
    const church = await db.church.findUnique({
      where: { id: requestedChurchId },
    });
    if (!church) {
      throw new AuthError("Church not found", 404);
    }
    return requestedChurchId;
  }

  if (!ctx.churchId) {
    throw new AuthError(
      "You are not assigned to a church yet. Contact your administrator.",
      403
    );
  }

  return ctx.churchId;
}
