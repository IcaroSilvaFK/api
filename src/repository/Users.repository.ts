import { prisma } from "../prisma/prisma";

interface INewUser {
  username: string;
  email: string;
}

export class UsersRepository {
  async create({ email, username }: INewUser) {
    const user = await prisma.user.create({
      data: {
        email,
        userName: username,
      },
    });

    return user;
  }
}
