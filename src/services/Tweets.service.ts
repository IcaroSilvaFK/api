import { TweetsRepository } from "../repository/Tweets.repository";

interface ITweetProps {
  id: string;
  tweet: string;
}

export class TweetsService {
  constructor(private readonly tweetsRepository: TweetsRepository) {}

  async create({ id, tweet }: ITweetProps) {
    const newTweet = await this.tweetsRepository.create({ id, tweet });

    return newTweet;
  }

  async getAll() {
    const tweets = await this.tweetsRepository.getAll();

    return tweets;
  }
}
