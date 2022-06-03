import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";
import { AppError } from "../errors/App.error";
interface INewUser {
  username: string;
  email: string;
  password: string;
}

type ILogin = Pick<INewUser, "email">;

const SALT = 10;

export class UsersRepository {
  async create({ email, username, password }: INewUser) {
    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await prisma.user.create({
      data: {
        email,
        userName: username,
        password: hashPassword,
      },
      select: {
        email: true,
        id: true,
        userName: true,
      },
    });

    return user;
  }

  async login({ email }: ILogin) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
