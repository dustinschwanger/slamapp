import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { ChurchDetailClient } from "./ChurchDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ churchId: string }>;
}

export default async function ChurchDetailPage({ params }: Props) {
  const { churchId } = await params;

  const church = await db.church.findUnique({
    where: { id: churchId },
    include: {
      users: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          avatarUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
      },
      _count: {
        select: {
          users: true,
          communities: true,
          groups: true,
        },
      },
    },
  });

  if (!church) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/super-admin/churches"
          className="inline-flex items-center gap-2 text-base text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Churches
        </Link>
      </div>

      <ChurchDetailClient
        church={{
          id: church.id,
          name: church.name,
          slug: church.slug,
          address: church.address,
          city: church.city,
          state: church.state,
          zip: church.zip,
          phone: church.phone,
          website: church.website,
          isActive: church.isActive,
          createdAt: church.createdAt.toISOString(),
        }}
        users={church.users.map((u) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          role: u.role,
          avatarUrl: u.avatarUrl,
          createdAt: u.createdAt.toISOString(),
        }))}
        counts={church._count}
      />
    </div>
  );
}
