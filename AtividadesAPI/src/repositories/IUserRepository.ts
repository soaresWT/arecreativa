import { User } from "../types/User";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<any>;
  findAll(): Promise<User[]>;
  createUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User>;
}
