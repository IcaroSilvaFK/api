import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { LikedsRepository } from "../repository/Likeds.repository";
import { LikedsService } from "../services/Likeds.service";

export class LikedsController {
  static async update(request: Request, response: Response) {
    const { userId, tweetId, id } = request.body;
    const likedsRepository = new LikedsRepository();
    const likedsService = new LikedsService(likedsRepository);
    if (!userId || !tweetId) {
      return response.status(404).json({
        message: "Tweeter id or user is invalid",
      });
    }

    try {
      await likedsService.execute({
        userId,
        tweetId,
        id,
      });

      return response.status(200).json({
        message: "Actualized success",
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return response.status(500).json({
          Message: error.message,
        });
      }
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
