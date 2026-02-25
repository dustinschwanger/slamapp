-- CreateTable: churches
CREATE TABLE "churches" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "churches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "churches_slug_key" ON "churches"("slug");

-- Seed a default church for existing data
INSERT INTO "churches" ("id", "name", "slug", "updated_at")
VALUES ('00000000-0000-0000-0000-000000000001', 'Default Church', 'default-church', CURRENT_TIMESTAMP);

-- AlterTable: users (nullable churchId + update role default)
ALTER TABLE "users" ADD COLUMN "church_id" UUID;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'member';

-- Assign all existing users to the default church
UPDATE "users" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;

-- AlterTable: lessons (nullable churchId + new fields)
ALTER TABLE "lessons" ADD COLUMN "church_id" UUID,
ADD COLUMN "is_template" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "source_template_id" UUID;

-- AlterTable: Add church_id as NULLABLE first to all tables with existing data
ALTER TABLE "admin_notes" ADD COLUMN "church_id" UUID;
ALTER TABLE "communities" ADD COLUMN "church_id" UUID;
ALTER TABLE "groups" ADD COLUMN "church_id" UUID;
ALTER TABLE "messages" ADD COLUMN "church_id" UUID;
ALTER TABLE "playlists" ADD COLUMN "church_id" UUID;
ALTER TABLE "prayer_requests" ADD COLUMN "church_id" UUID;
ALTER TABLE "service_plans" ADD COLUMN "church_id" UUID;
ALTER TABLE "volunteer_applications" ADD COLUMN "church_id" UUID;
ALTER TABLE "volunteer_shifts" ADD COLUMN "church_id" UUID;

-- Backfill: assign existing rows to default church
UPDATE "admin_notes" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "communities" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "groups" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "messages" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "playlists" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "prayer_requests" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "service_plans" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "volunteer_applications" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;
UPDATE "volunteer_shifts" SET "church_id" = '00000000-0000-0000-0000-000000000001' WHERE "church_id" IS NULL;

-- Now make required columns NOT NULL
ALTER TABLE "admin_notes" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "communities" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "groups" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "messages" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "playlists" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "prayer_requests" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "service_plans" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "volunteer_applications" ALTER COLUMN "church_id" SET NOT NULL;
ALTER TABLE "volunteer_shifts" ALTER COLUMN "church_id" SET NOT NULL;

-- CreateIndexes
CREATE INDEX "admin_notes_church_id_idx" ON "admin_notes"("church_id");
CREATE INDEX "communities_church_id_idx" ON "communities"("church_id");
CREATE INDEX "groups_church_id_idx" ON "groups"("church_id");
CREATE INDEX "lessons_church_id_idx" ON "lessons"("church_id");
CREATE INDEX "messages_church_id_idx" ON "messages"("church_id");
CREATE INDEX "playlists_church_id_idx" ON "playlists"("church_id");
CREATE INDEX "prayer_requests_church_id_idx" ON "prayer_requests"("church_id");
CREATE INDEX "service_plans_church_id_idx" ON "service_plans"("church_id");
CREATE INDEX "users_church_id_idx" ON "users"("church_id");
CREATE INDEX "volunteer_applications_church_id_idx" ON "volunteer_applications"("church_id");
CREATE INDEX "volunteer_shifts_church_id_idx" ON "volunteer_shifts"("church_id");

-- AddForeignKeys
ALTER TABLE "users" ADD CONSTRAINT "users_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "communities" ADD CONSTRAINT "communities_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "groups" ADD CONSTRAINT "groups_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "prayer_requests" ADD CONSTRAINT "prayer_requests_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "messages" ADD CONSTRAINT "messages_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "volunteer_shifts" ADD CONSTRAINT "volunteer_shifts_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "volunteer_applications" ADD CONSTRAINT "volunteer_applications_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "admin_notes" ADD CONSTRAINT "admin_notes_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "service_plans" ADD CONSTRAINT "service_plans_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "churches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
