-- DropIndex
DROP INDEX "public"."Problem_assignmentId_idx";

-- AlterTable
ALTER TABLE "public"."Problem" ALTER COLUMN "expectedOutput" DROP NOT NULL;
