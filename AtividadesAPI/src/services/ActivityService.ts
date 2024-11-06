import { ActivityRepositoryFactory } from "../factories/ActivityRepositoryFactory";
import { Activity } from "../types/Activity";
import { ICreateActivityData } from "../types/CreateActivityData";

export class ActivityService {
  private activityRepository;

  constructor() {
    this.activityRepository = ActivityRepositoryFactory.create();
  }

  async createActivity(data: ICreateActivityData) {
    return this.activityRepository.create(data);
  }

  async getAllActivities() {
    return this.activityRepository.findAll();
  }

  async getActivityById(id: string) {
    return this.activityRepository.findById(id);
  }

  async updateActivity(id: string, data: Partial<Activity>) {
    return this.activityRepository.update(id, data);
  }

  async disableActivity(id: string) {
    return this.activityRepository.disable(id);
  }
}
