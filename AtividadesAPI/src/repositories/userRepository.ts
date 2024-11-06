import prisma from "../config/database";
import { User } from "../types/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async createUser(data: { name: string; email: string; password: string }) {
    return await prisma.user.create({ data });
  }
}
