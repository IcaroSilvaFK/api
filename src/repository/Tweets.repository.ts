import { prisma } from "../prisma/prisma";

interface ITweetProps {
  id: string;
  tweet: string;
}

export class TweetsRepository {
  async create({ id, tweet }: ITweetProps) {
    const newTweet = await prisma.tweet.create({
      data: {
        user_id: id,
        tweet,
      },
    });

    return newTweet;
  }
}
