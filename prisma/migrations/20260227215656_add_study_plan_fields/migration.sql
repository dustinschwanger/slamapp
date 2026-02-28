-- AlterTable
ALTER TABLE "churches" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "service_plans" ADD COLUMN     "study_plan_id" TEXT,
ADD COLUMN     "study_plan_name" TEXT,
ADD COLUMN     "study_plan_week" INTEGER;
