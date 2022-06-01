import { Request, Response } from "express";

import { UsersService } from "../services/Users.service";
import { UsersRepository } from "../repository/Users.repository";

export class UserController {
  static async create(request: Request, response: Response) {
    const { email, username } = request.body;
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);

    if (!email || !username) {
      return response.status(400).json({
        message: "Email or Username as missing a type",
      });
    }

    try {
      const user = usersService.create({ email, username });

      return response.status(201).json({
        user,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
