"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Community } from "@/lib/types";

const prayerRequestSchema = z.object({
  requesterName: z.string().min(1, "Name is required"),
  requestText: z.string().min(10, "Please share your prayer request (at least 10 characters)"),
  communityId: z.string().min(1, "Please select a community"),
  isAnonymous: z.boolean(),
  isUrgent: z.boolean(),
});

type PrayerRequestFormData = z.infer<typeof prayerRequestSchema>;

interface PrayerRequestFormProps {
  onSubmit?: (data: PrayerRequestFormData) => void;
  defaultName?: string;
  communities?: Community[];
}

export function PrayerRequestForm({
  onSubmit,
  defaultName = "",
  communities = [],
}: PrayerRequestFormProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PrayerRequestFormData>({
    defaultValues: {
      requesterName: defaultName,
      requestText: "",
      communityId: "",
      isAnonymous: false,
      isUrgent: false,
    },
  });

  const isAnonymous = watch("isAnonymous");

  const handleFormSubmit = (data: PrayerRequestFormData) => {
    onSubmit?.(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center">
        <div className="text-3xl mb-4">&#128591;</div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          Prayer Request Submitted
        </h3>
        <p className="text-base text-[var(--color-text-secondary)]">
          Your prayer request has been shared with the community. We are lifting you up in prayer.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      {/* Requester name */}
      <div>
        <label
          htmlFor="requesterName"
          className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
        >
          Your Name (or on behalf of)
        </label>
        <Input
          id="requesterName"
          placeholder="Enter name"
          disabled={isAnonymous}
          {...register("requesterName", { required: !isAnonymous ? "Name is required" : false })}
        />
        {errors.requesterName && (
          <p className="mt-1 text-sm text-[var(--color-error)]">
            {errors.requesterName.message}
          </p>
        )}
      </div>

      {/* Prayer request text */}
      <div>
        <label
          htmlFor="requestText"
          className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
        >
          Prayer Request
        </label>
        <Textarea
          id="requestText"
          placeholder="Share your prayer request..."
          autoGrow
          className="min-h-[120px]"
          {...register("requestText", {
            required: "Please share your prayer request",
            minLength: { value: 10, message: "At least 10 characters" },
          })}
        />
        {errors.requestText && (
          <p className="mt-1 text-sm text-[var(--color-error)]">
            {errors.requestText.message}
          </p>
        )}
      </div>

      {/* Community selector */}
      <div>
        <label
          htmlFor="communityId"
          className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
        >
          Community / Room
        </label>
        <select
          id="communityId"
          className="flex h-12 w-full rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 text-base text-[var(--color-text-primary)] transition-colors duration-[var(--duration-normal)] focus-visible:border-[var(--color-border-focus)] focus-visible:outline-3 focus-visible:outline-[var(--color-ring)] focus-visible:outline-offset-2"
          {...register("communityId", { required: "Please select a community" })}
        >
          <option value="">Select a community</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.communityId && (
          <p className="mt-1 text-sm text-[var(--color-error)]">
            {errors.communityId.message}
          </p>
        )}
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="h-6 w-6 rounded-[var(--radius-sm)] border-2 border-[var(--color-border)] accent-[var(--color-prayer)] cursor-pointer"
            {...register("isAnonymous")}
          />
          <span className="text-base text-[var(--color-text-primary)]">
            Submit anonymously
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="h-6 w-6 rounded-[var(--radius-sm)] border-2 border-[var(--color-border)] accent-[var(--color-warning)] cursor-pointer"
            {...register("isUrgent")}
          />
          <span className="text-base text-[var(--color-text-primary)]">
            Mark as urgent
          </span>
        </label>
      </div>

      {/* Submit */}
      <Button type="submit" variant="prayer" size="lg" className="w-full">
        Submit Prayer Request
      </Button>
    </form>
  );
}
