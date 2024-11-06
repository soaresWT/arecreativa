import prisma from "../config/database";
import { Activity } from "../types/Activity";
import { ICreateActivityData } from "../types/CreateActivityData";
import { IActivityRepository } from "./IActivityRepository";

export class ActivityRepository implements IActivityRepository {
  async create(data: ICreateActivityData): Promise<Activity> {
    const createData: any = {
      title: data.title,
      summary: data.summary ?? undefined,
      objectives: data.objectives,
      bncc_skills: data.bncc_skills,
      total_time: data.total_time,
      required_resources: data.required_resources,
      step_by_step_guide: data.step_by_step_guide,
    };

    if (data.user_id) {
      const userExists = await prisma.user.findUnique({
        where: { id: data.user_id },
      });

      if (!userExists) {
        throw new Error("Usuário não encontrado.");
      }

      createData.user_id = data.user_id;
    }
    return await prisma.activity.create({
      data: createData,
    });
  }

  async findAll(): Promise<Activity[]> {
    return await prisma.activity.findMany({
      where: { status: true },
    });
  }

  async findById(id: string): Promise<Activity | null> {
    return await prisma.activity.findUnique({
      where: { id },
      include: { pdfs: true },
    });
  }

  async update(id: string, data: Partial<Activity>): Promise<Activity | null> {
    const updateData: any = {
      title: data.title,
      summary: data.summary ?? undefined,
      objectives: data.objectives,
      bncc_skills: data.bncc_skills,
      total_time: data.total_time,
      required_resources: data.required_resources,
      step_by_step_guide: data.step_by_step_guide,
      status: data.status,
    };

    if (data.user_id) {
      const userExists = await prisma.user.findUnique({
        where: { id: data.user_id },
      });

      if (!userExists) {
        throw new Error("Usuário não encontrado.");
      }

      updateData.user_id = data.user_id;
    }

    return await prisma.activity.update({
      where: { id },
      data: updateData,
    });
  }

  async disable(id: string): Promise<Activity | null> {
    return await prisma.activity.update({
      where: { id },
      data: { status: false },
    });
  }
}
