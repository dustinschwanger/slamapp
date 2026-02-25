import Link from "next/link";
import { Plus, Building2, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ChurchesPage() {
  const churches = await db.church.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { users: true },
      },
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Churches
          </h1>
          <p className="mt-1 text-base text-[var(--color-text-secondary)]">
            {churches.length} church{churches.length !== 1 ? "es" : ""} registered
          </p>
        </div>
        <Link href="/super-admin/churches/create">
          <Button>
            <Plus className="h-5 w-5" />
            Create Church
          </Button>
        </Link>
      </div>

      {churches.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-[var(--color-text-tertiary)]" />
          <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
            No churches yet
          </h3>
          <p className="mt-2 text-base text-[var(--color-text-secondary)]">
            Create your first church to get started.
          </p>
          <Link href="/super-admin/churches/create" className="inline-block mt-4">
            <Button>
              <Plus className="h-5 w-5" />
              Create Church
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)]">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-secondary)]">
                    Church
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-secondary)]">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-secondary)]">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-secondary)]">
                    Users
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-secondary)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {churches.map((church) => (
                  <tr
                    key={church.id}
                    className="transition-colors hover:bg-[var(--color-bg-surface)]"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/super-admin/churches/${church.id}`}
                        className="text-base font-semibold text-[var(--color-primary)] hover:underline"
                      >
                        {church.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <code className="rounded-[var(--radius-sm)] bg-[var(--color-bg-secondary)] px-2 py-1 text-sm text-[var(--color-text-secondary)]">
                        {church.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      {church.city && church.state ? (
                        <span className="flex items-center gap-1 text-base text-[var(--color-text-secondary)]">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {church.city}, {church.state}
                        </span>
                      ) : (
                        <span className="text-sm text-[var(--color-text-tertiary)]">
                          --
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-base text-[var(--color-text-secondary)]">
                        <Users className="h-4 w-4" />
                        {church._count.users}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {church.isActive ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-[var(--color-border)]">
            {churches.map((church) => (
              <Link
                key={church.id}
                href={`/super-admin/churches/${church.id}`}
                className="block p-4 transition-colors hover:bg-[var(--color-bg-surface)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold text-[var(--color-text-primary)]">
                      {church.name}
                    </p>
                    <code className="text-sm text-[var(--color-text-tertiary)]">
                      {church.slug}
                    </code>
                  </div>
                  {church.isActive ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                  {church.city && church.state && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {church.city}, {church.state}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {church._count.users} user{church._count.users !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
