import { UsersRepository } from "../repository/Users.repository";

interface INewUser {
  username: string;
  email: string;
}

export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create({ email, username }: INewUser) {
    return this.userRepository.create({ email, username });
  }
}
