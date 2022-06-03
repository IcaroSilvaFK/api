import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UsersService } from "../services/Users.service";
import { UsersRepository } from "../repository/Users.repository";
import { AppError } from "../errors/App.error";
import { Prisma } from "@prisma/client";

const KEY = process.env.KEY;

export class UserController {
  static async create(request: Request, response: Response) {
    const { email, username, password } = request.body;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    if (!email || !username || !password) {
      return response.status(400).json({
        message: "Email or Username as missing a type",
      });
    }

    try {
      const user = await usersService.create({ email, username, password });

      const token = jwt.sign(
        {
          id: user?.id,
        },
        KEY as string,
        { expiresIn: 60 * 60 * 24 }
      );

      return response.status(201).json({
        user,
        token,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        switch (error.code) {
          case "P2002": {
            return response.status(400).json({
              message: "User exists",
              error: error.name,
            });
          }
        }
      }
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    if (!email || !password) {
      return response.status(400).json({
        message: "Email or password as missing a type",
      });
    }

    try {
      const {
        avatarUrl,
        email: userEmail,
        id,
        userName,
      } = await usersService.login({ email, password });

      const token = jwt.sign(
        {
          id: id,
        },
        KEY as string,
        { expiresIn: 60 * 60 * 24 }
      );

      return response.status(200).json({
        user: {
          avatarUrl,
          email: userEmail,
          userName,
        },
        token,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          messsage: error.message,
        });
      }
    }
  }
}
