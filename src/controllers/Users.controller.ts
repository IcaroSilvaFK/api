import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import { UsersService } from "../services/Users.service";
import { UsersRepository } from "../repository/Users.repository";
import { AppError } from "../errors/App.error";

const KEY = process.env.KEY;

export class UserController {
  static async create(request: Request, response: Response) {
    const { email, username, password, name } = request.body;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    if (!email || !username || !password || !name) {
      return response.status(400).json({
        message: "Email or Username as missing a type",
      });
    }

    try {
      const user = await usersService.create({
        email,
        username,
        password,
        name,
      });

      const token = jwt.sign(
        {
          id: user?.id,
        },
        KEY as string,
        { expiresIn: 60 * 60 * 24 }
      );

      return response.status(201).json({
        user: {
          avatarUrl: user.avatarUrl,
          email: user.email,
          userName: user.userName,
          name: user.name,
          createdAt: user.createdAt,
        },
        token,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
        name,
        createdAt,
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
          name,
          createdAt,
          id,
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

  static async updateImage(request: Request, response: Response) {
    const { image, id } = request.body;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);
    console.log({ image, id });
    if (!image || !id) {
      return response.status(400).json({
        message: "Image or id as missing a type",
      });
    }

    try {
      const userImage = await usersService.updateImage(image, id);
      return response.status(200).json(userImage);
    } catch (error) {}
  }

  static async getUser(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    if (!id) {
      return response.status(404).json({
        message: "Cannot route",
      });
    }

    try {
      const user = await usersService.getUser(id);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
