import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/userRepository";

export class UserRepositoryFactory {
  static create(): IUserRepository {
    return new UserRepository();
  }
}
