import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { TweetsRepository } from "../repository/Tweets.repository";
import { TweetsService } from "../services/Tweets.service";

export class TweetsController {
  static async create(request: Request, response: Response) {
    const { id, tweet } = request.body;
    const tweetsRepository = new TweetsRepository();
    const tweetsService = new TweetsService(tweetsRepository);

    if (!tweet) {
      return response.status(400).json({
        message: "Id or Tweet as missing a type",
      });
    }

    try {
      const newTweet = await tweetsService.create({
        id,
        tweet,
      });

      return response.status(201).json(newTweet);
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getAll(request: Request, response: Response) {
    const tweetsRepository = new TweetsRepository();
    const tweetsService = new TweetsService(tweetsRepository);

    try {
      const tweets = await tweetsService.getAll();

      return response.status(200).json(tweets);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return response.status(500).json({
          message: error.message,
          code: error.code,
        });
      }
    }
  }
}
