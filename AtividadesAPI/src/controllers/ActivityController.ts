import { Request, Response } from "express";
import { ActivityService } from "../services/ActivityService";
import { generatePDF } from "../services/pdfService";

const activityService = new ActivityService();

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activityData = req.body;
    const activity = await activityService.createActivity(activityData);
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to create activity" });
  }
};

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await activityService.getActivityById(id);
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await activityService.updateActivity(id, req.body);
    if (updatedActivity) {
      res.status(200).json(updatedActivity);
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update activity" });
  }
};

export const disableActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deactivatedActivity = await activityService.disableActivity(id);
    if (deactivatedActivity) {
      res.status(200).json(deactivatedActivity);
    } else {
      res.status(404).json({ error: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to deactivate activity" });
  }
};

export const generatePDFController = async (req: Request, res: Response) => {
  const activityId = req.params.id;
  try {
    const pdfFilePath = await generatePDF(activityId);
    res.download(pdfFilePath);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
};
