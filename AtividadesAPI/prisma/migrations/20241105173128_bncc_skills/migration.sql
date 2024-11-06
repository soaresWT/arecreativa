/*
  Warnings:

  - The `bncc_skills` column on the `activities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "bncc_skills",
ADD COLUMN     "bncc_skills" TEXT[];
