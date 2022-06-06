import bcrypt from "bcrypt";

import { AppError } from "../errors/App.error";
import { UsersRepository } from "../repository/Users.repository";

interface INewUser {
  username: string;
  email: string;
  password: string;
  name: string;
}

type UserLogin = Omit<INewUser, "username" | "name">;
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ email, username, password, name }: INewUser) {
    return this.userRepository.create({ email, username, password, name });
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

  async updateImage(image: string, id: string) {
    return this.userRepository.updateImage({ image, id });
  }
  async getUser(id: string) {
    const user = await this.userRepository.getUser(id);

    return user;
  }
}
