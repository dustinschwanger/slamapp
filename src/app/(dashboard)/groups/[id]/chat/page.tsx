"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "@/components/groups/ChatWindow";
import { useChurch } from "@/components/providers/ChurchProvider";

export default function GroupChatPage() {
  const params = useParams();
  const groupId = params.id as string;
  const { userId } = useChurch();

  const [groupName, setGroupName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/groups/${groupId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load group");
        }
        const data = await res.json();
        setGroupName(data.name);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load group";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroup();
  }, [groupId]);

  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <Link href={`/groups/${groupId}`} className="inline-block mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Group
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Loader2 className="h-8 w-8 mx-auto mb-3 text-[var(--color-text-tertiary)] animate-spin" />
          <p className="text-base text-[var(--color-text-secondary)]">
            Loading chat...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl">
        <Link href="/groups" className="inline-block mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </Button>
        </Link>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-error)] bg-[var(--color-bg-card)] p-10 text-center">
          <p className="text-base text-[var(--color-error)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link href={`/groups/${groupId}`} className="inline-block mb-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Group
        </Button>
      </Link>

      <ChatWindow
        groupId={groupId}
        currentUserId={userId}
        groupName={groupName}
      />
    </div>
  );
}
