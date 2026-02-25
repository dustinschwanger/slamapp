"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const communityFormSchema = z.object({
  name: z.string().min(1, "Community name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  notes: z.string().optional(),
});

type CommunityFormData = z.infer<typeof communityFormSchema>;

export default function CreateCommunityPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityFormData>({
    resolver: standardSchemaResolver(communityFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      contactName: "",
      contactPhone: "",
      notes: "",
    },
  });

  const onSubmit = async (data: CommunityFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/communities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create community");
      }

      toast.success("Community created successfully");
      router.push("/admin/communities");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create community";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Back button */}
      <Link href="/admin/communities" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Communities
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[#003B7118]">
          <Building2 className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Add Community
        </h2>
      </div>

      {/* Form */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-md)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Community Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Community Name <span className="text-[var(--color-error)]">*</span>
            </label>
            <Input
              id="name"
              placeholder="e.g., Sunrise Senior Living"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--color-error)]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Street Address{" "}
              <span className="text-[var(--color-error)]">*</span>
            </label>
            <Input
              id="address"
              placeholder="e.g., 123 Main Street"
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-[var(--color-error)]">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City, State, ZIP in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label
                htmlFor="city"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                City <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input
                id="city"
                placeholder="City"
                {...register("city")}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                State <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input
                id="state"
                placeholder="State"
                {...register("state")}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="zip"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                ZIP Code <span className="text-[var(--color-error)]">*</span>
              </label>
              <Input
                id="zip"
                placeholder="ZIP"
                {...register("zip")}
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-[var(--color-error)]">
                  {errors.zip.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Name */}
          <div>
            <label
              htmlFor="contactName"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Contact Name
            </label>
            <Input
              id="contactName"
              placeholder="Facility contact person"
              {...register("contactName")}
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label
              htmlFor="contactPhone"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Contact Phone
            </label>
            <Input
              id="contactPhone"
              placeholder="(555) 123-4567"
              {...register("contactPhone")}
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Any additional information about this community..."
              autoGrow
              {...register("notes")}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Community"}
            </Button>
            <Link href="/admin/communities">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
