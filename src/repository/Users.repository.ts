import { prisma } from "../prisma/prisma";
import bcrypt from "bcrypt";

import { client } from "../configs/cloudinary";
interface INewUser {
  username: string;
  email: string;
  password: string;
  name: string;
}

interface IUserImage {
  image: string;
  id: string;
}

type ILogin = Pick<INewUser, "email">;

const SALT = 10;

export class UsersRepository {
  async create({ email, username, password, name }: INewUser) {
    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await prisma.user.create({
      data: {
        email,
        userName: username,
        password: hashPassword,
        name,
      },
      select: {
        email: true,
        id: true,
        userName: true,
        avatarUrl: true,
        name: true,
        createdAt: true,
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
  async updateImage({ image: userImage, id }: IUserImage) {
    const image = await client.uploader.upload(userImage);
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarUrl: image.secure_url,
      },
      select: {
        avatarUrl: true,
      },
    });
    return user;
  }
  async getUser(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        id: true,
        userName: true,
        avatarUrl: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  }
}
