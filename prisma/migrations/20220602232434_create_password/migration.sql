/*
  Warnings:

  - Added the required column `password` to the `tweets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "password" TEXT NOT NULL;
