import bcrypt from "bcrypt";

import { AppError } from "../errors/App.error";
import { UsersRepository } from "../repository/Users.repository";

interface INewUser {
  username: string;
  email: string;
  password: string;
}

type UserLogin = Omit<INewUser, "username">;
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ email, username, password }: INewUser) {
    return this.userRepository.create({ email, username, password });
  }

  async login({ email, password }: UserLogin) {
    const user = await this.userRepository.login({ email });

    if (!user) {
      throw new AppError("User not exists", 404);
    }
    const userMatchPassword = await bcrypt.compare(password, user.password!);

    if (!userMatchPassword) {
      throw new AppError("Password or email is incorret", 400);
    }
    return user;
  }
}
