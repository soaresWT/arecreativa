import { UserRepositoryFactory } from "../factories/UserRepositoryFactory";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = UserRepositoryFactory.create();
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async createUser(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }
}
