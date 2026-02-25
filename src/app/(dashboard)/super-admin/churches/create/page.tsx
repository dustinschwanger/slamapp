"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const churchSchema = z.object({
  name: z.string().min(1, "Church name is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric with hyphens only"
    ),
  address: z.string().max(300).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  state: z.string().max(50).optional().or(z.literal("")),
  zip: z.string().max(20).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  website: z.string().max(300).optional().or(z.literal("")),
});

type ChurchFormData = z.infer<typeof churchSchema>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateChurchPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChurchFormData>({
    defaultValues: {
      name: "",
      slug: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      website: "",
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);
    setValue("slug", slugify(name));
  };

  const onSubmit = async (data: ChurchFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      // Validate with Zod
      const parsed = churchSchema.parse(data);

      const res = await fetch("/api/super-admin/churches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Failed to create church");
        return;
      }

      router.push("/super-admin/churches");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setServerError(err.issues[0]?.message || "Validation failed");
      } else {
        setServerError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Create Church
        </h1>
        <p className="mt-1 text-base text-[var(--color-text-secondary)]">
          Add a new church to the SLAM platform.
        </p>
      </div>

      <div className="max-w-2xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)] p-6 sm:p-8">
        {serverError && (
          <div className="mb-6 rounded-[var(--radius-md)] border border-[var(--color-error)] bg-[var(--color-error)]/10 p-4 text-base text-[var(--color-error)]">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Church Name <span className="text-[var(--color-error)]">*</span>
            </label>
            <Input
              id="name"
              {...register("name")}
              onChange={handleNameChange}
              placeholder="e.g., First Baptist Church"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--color-error)]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Slug <span className="text-[var(--color-error)]">*</span>
            </label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="e.g., first-baptist-church"
              aria-invalid={!!errors.slug}
            />
            <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">
              Auto-generated from name. Lowercase, alphanumeric with hyphens.
            </p>
            {errors.slug && (
              <p className="mt-1 text-sm text-[var(--color-error)]">
                {errors.slug.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Address
            </label>
            <Input
              id="address"
              {...register("address")}
              placeholder="123 Main Street"
            />
          </div>

          {/* City / State / Zip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                City
              </label>
              <Input id="city" {...register("city")} placeholder="Springfield" />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                State
              </label>
              <Input id="state" {...register("state")} placeholder="MO" />
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
              >
                Zip
              </label>
              <Input id="zip" {...register("zip")} placeholder="65801" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Phone
            </label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-base font-medium text-[var(--color-text-primary)] mb-2"
            >
              Website
            </label>
            <Input
              id="website"
              {...register("website")}
              placeholder="https://www.example.com"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Church"}
            </Button>
            <Link href="/super-admin/churches">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
