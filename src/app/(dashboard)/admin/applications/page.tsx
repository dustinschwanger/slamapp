"use client";

import * as React from "react";
import {
  Users,
  Loader2,
  Mail,
  Phone,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string | null;
  churchName: string | null;
  experience: string | null;
  availability: string | null;
  referencesInfo: string | null;
  status: "pending" | "approved" | "declined";
  notes: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Dialog state
  const [reviewDialogOpen, setReviewDialogOpen] = React.useState(false);
  const [selectedApp, setSelectedApp] = React.useState<Application | null>(null);
  const [reviewAction, setReviewAction] = React.useState<"approved" | "declined">("approved");
  const [reviewNotes, setReviewNotes] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const fetchApplications = React.useCallback(async () => {
    try {
      const res = await fetch("/api/volunteers/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications ?? []);
      }
    } catch {
      // API not available
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openReviewDialog = (
    app: Application,
    action: "approved" | "declined"
  ) => {
    setSelectedApp(app);
    setReviewAction(action);
    setReviewNotes("");
    setReviewDialogOpen(true);
  };

  const handleReview = async () => {
    if (!selectedApp) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `/api/volunteers/applications/${selectedApp.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: reviewAction,
            notes: reviewNotes || undefined,
          }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) =>
          prev.map((a) =>
            a.id === selectedApp.id
              ? {
                  ...a,
                  status: updated.status,
                  notes: updated.notes,
                  reviewedBy: updated.reviewedBy,
                  reviewedAt: updated.reviewedAt,
                }
              : a
          )
        );
        toast.success(
          `Application ${reviewAction === "approved" ? "approved" : "declined"}`
        );
        setReviewDialogOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to update application");
      }
    } catch {
      toast.error("Failed to update application");
    } finally {
      setSubmitting(false);
    }
  };

  const pending = applications.filter((a) => a.status === "pending");
  const approved = applications.filter((a) => a.status === "approved");
  const declined = applications.filter((a) => a.status === "declined");

  const renderApplicationList = (apps: Application[], showActions: boolean) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
        </div>
      );
    }

    if (apps.length === 0) {
      return (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 text-center">
          <Inbox className="h-10 w-10 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
          <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
            No applications
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Applications will appear here when submitted.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {apps.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            showActions={showActions}
            onApprove={() => openReviewDialog(app, "approved")}
            onDecline={() => openReviewDialog(app, "declined")}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#2E7D4F18]">
          <Users className="h-5 w-5 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          Volunteer Applications
        </h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined ({declined.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {renderApplicationList(pending, true)}
        </TabsContent>

        <TabsContent value="approved">
          {renderApplicationList(approved, false)}
        </TabsContent>

        <TabsContent value="declined">
          {renderApplicationList(declined, false)}
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approved" ? "Approve" : "Decline"} Application
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approved"
                ? `Approve ${selectedApp?.applicantName}'s volunteer application?`
                : `Decline ${selectedApp?.applicantName}'s volunteer application?`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <label
              htmlFor="reviewNotes"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Notes (optional)
            </label>
            <Textarea
              id="reviewNotes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add any notes about this decision..."
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant={reviewAction === "approved" ? "default" : "destructive"}
              onClick={handleReview}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : reviewAction === "approved" ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Approve
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  Decline
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ApplicationCard({
  application,
  showActions,
  onApprove,
  onDecline,
}: {
  application: Application;
  showActions: boolean;
  onApprove: () => void;
  onDecline: () => void;
}) {
  const statusBadge = {
    pending: { label: "Pending", variant: "warning" as const },
    approved: { label: "Approved", variant: "success" as const },
    declined: { label: "Declined", variant: "secondary" as const },
  }[application.status];

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">
              {application.applicantName}
            </span>
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-tertiary)] mt-1">
            <Clock className="h-3.5 w-3.5" />
            Applied{" "}
            {new Date(application.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-secondary)] mb-3">
        <span className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
          {application.email}
        </span>
        {application.phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
            {application.phone}
          </span>
        )}
        {application.churchName && (
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
            {application.churchName}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        {application.experience && (
          <div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Experience:{" "}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {application.experience}
            </span>
          </div>
        )}
        {application.availability && (
          <div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Availability:{" "}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {application.availability}
            </span>
          </div>
        )}
        {application.referencesInfo && (
          <div>
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              References:{" "}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {application.referencesInfo}
            </span>
          </div>
        )}
      </div>

      {/* Review info (for approved/declined) */}
      {application.reviewedBy && (
        <div className="text-xs text-[var(--color-text-tertiary)] mb-3 border-t border-[var(--color-border)] pt-3">
          Reviewed by {application.reviewedBy}
          {application.reviewedAt &&
            ` on ${new Date(application.reviewedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
          {application.notes && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Notes: {application.notes}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-3 pt-2 border-t border-[var(--color-border)]">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={onApprove}
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={onDecline}
          >
            <XCircle className="h-4 w-4" />
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}
