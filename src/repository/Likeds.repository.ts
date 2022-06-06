import { prisma } from "../prisma/prisma";

interface IExecuteProps {
  userId: string;
  tweetId: string;
  id?: string;
}

export class LikedsRepository {
  async execute({ userId, tweetId, id }: IExecuteProps) {
    const response = await prisma.likeds.findFirst({
      where: {
        tweet_id: tweetId,
        AND: {
          user_id: userId,
        },
      },
    });

    if (response) {
      await prisma.likeds.delete({
        where: {
          id,
        },
      });

      return;
    }

    await prisma.likeds.create({
      data: {
        tweet_id: tweetId,
        user_id: userId,
        isLiked: true,
      },
    });
  }
}
