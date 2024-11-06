/*
  Warnings:

  - Made the column `user_id` on table `activities` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_user_id_fkey";

-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
