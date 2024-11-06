import { Router } from "express";
import {
  getAllActivities,
  getActivityById,
  updateActivity,
  createActivity,
  disableActivity,
  generatePDFController,
} from "../controllers/ActivityController";
import { generatePDF } from "../services/pdfService";
const router = Router();

router.post("/", createActivity);

router.get("/", getAllActivities);

router.get("/:id", getActivityById);

router.put("/:id", updateActivity);

router.put("/disable/:id", disableActivity);

router.get("/pdf/:id", generatePDFController);

export default router;
