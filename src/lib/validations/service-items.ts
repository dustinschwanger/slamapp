import { z } from "zod";

export const servicePlanItemSchema = z.object({
  type: z.enum(["song", "scripture", "lesson_block", "prayer_time", "announcement", "custom"]),
  title: z.string().min(1, "Title is required").max(500),
  position: z.number().int().min(0).optional(),
  notes: z.string().max(2000).optional().nullable(),
  estimatedDurationSeconds: z.number().int().min(0).max(7200).optional(),
  itemData: z.record(z.string(), z.unknown()).optional().nullable(),
});

export const servicePlanItemsArraySchema = z
  .array(servicePlanItemSchema)
  .min(1, "At least one item is required")
  .max(100);
