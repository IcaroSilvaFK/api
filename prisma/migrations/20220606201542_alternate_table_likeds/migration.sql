/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `likeds` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "likeds" ALTER COLUMN "isLiked" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "likeds_user_id_key" ON "likeds"("user_id");
