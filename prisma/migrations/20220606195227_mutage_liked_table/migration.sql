/*
  Warnings:

  - You are about to drop the column `quantity` on the `likeds` table. All the data in the column will be lost.
  - Added the required column `isLiked` to the `likeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likeds" DROP COLUMN "quantity",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL;
