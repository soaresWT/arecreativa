import { Activity } from "../types/Activity";

export interface IActivityRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<Activity[]>;
  findById(id: string): Promise<Activity | null>;
  update(id: string, data: Partial<Activity>): Promise<Activity | null>;
  disable(id: string): Promise<Activity | null>;
}
