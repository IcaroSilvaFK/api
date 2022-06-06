/*
  Warnings:

  - You are about to drop the `Likeds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likeds" DROP CONSTRAINT "Likeds_tweet_id_fkey";

-- DropForeignKey
ALTER TABLE "Likeds" DROP CONSTRAINT "Likeds_user_id_fkey";

-- DropTable
DROP TABLE "Likeds";

-- CreateTable
CREATE TABLE "likeds" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tweet_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "likeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_saved" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "posts_saved_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likeds_tweet_id_key" ON "likeds"("tweet_id");

-- AddForeignKey
ALTER TABLE "likeds" ADD CONSTRAINT "likeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeds" ADD CONSTRAINT "likeds_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_saved" ADD CONSTRAINT "posts_saved_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_saved" ADD CONSTRAINT "posts_saved_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
