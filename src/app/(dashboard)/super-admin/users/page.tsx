import { db } from "@/lib/db";
import { UsersClient } from "./UsersClient";

interface Props {
  searchParams: Promise<{ unassigned?: string }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const { unassigned } = await searchParams;
  const showUnassigned = unassigned === "true";

  const [users, churches] = await Promise.all([
    db.user.findMany({
      where: showUnassigned
        ? { churchId: null, role: { not: "super_admin" } }
        : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        avatarUrl: true,
        churchId: true,
        createdAt: true,
        church: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    db.church.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <UsersClient
      users={users.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        avatarUrl: u.avatarUrl,
        churchId: u.churchId,
        churchName: u.church?.name ?? null,
        createdAt: u.createdAt.toISOString(),
      }))}
      churches={churches}
      showUnassigned={showUnassigned}
    />
  );
}
