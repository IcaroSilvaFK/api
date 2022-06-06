import { LikedsRepository } from "../repository/Likeds.repository";

interface IExecuteProps {
  userId: string;
  tweetId: string;
  id?: string;
}

export class LikedsService {
  constructor(private readonly likedsResitory: LikedsRepository) {}
  async execute({ id, tweetId, userId }: IExecuteProps) {
    await this.likedsResitory.execute({
      id,
      tweetId,
      userId,
    });
  }
}
