import { ActivityRepository } from "../repositories/ActivityRepository";

export class ActivityRepositoryFactory {
  static create() {
    return new ActivityRepository();
  }
}
