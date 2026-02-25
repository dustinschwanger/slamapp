-- AlterTable: Add columns to songs that were added after initial migration
ALTER TABLE "songs" ADD COLUMN IF NOT EXISTS "sheet_music_url" TEXT;
ALTER TABLE "songs" ADD COLUMN IF NOT EXISTS "small_church_music_id" INTEGER;

-- CreateTable
CREATE TABLE "service_plans" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "service_date" DATE,
    "community_id" UUID,
    "room_id" UUID,
    "group_id" UUID,
    "created_by" UUID,
    "is_template" BOOLEAN NOT NULL DEFAULT false,
    "post_service_notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_plan_items" (
    "id" UUID NOT NULL,
    "service_plan_id" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "estimated_duration_seconds" INTEGER NOT NULL DEFAULT 180,
    "item_data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "service_plan_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_plan_items_service_plan_id_position_key" ON "service_plan_items"("service_plan_id", "position");

-- AddForeignKey
ALTER TABLE "service_plans" ADD CONSTRAINT "service_plans_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_plans" ADD CONSTRAINT "service_plans_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_plans" ADD CONSTRAINT "service_plans_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_plans" ADD CONSTRAINT "service_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_plan_items" ADD CONSTRAINT "service_plan_items_service_plan_id_fkey" FOREIGN KEY ("service_plan_id") REFERENCES "service_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
