-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "Likeds" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tweet_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Likeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Likeds_tweet_id_key" ON "Likeds"("tweet_id");

-- AddForeignKey
ALTER TABLE "Likeds" ADD CONSTRAINT "Likeds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likeds" ADD CONSTRAINT "Likeds_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
