import express from "express";
import userRoutes from "./routes/userRoutes";
import activityRoutes from "./routes/activityRoutes";
import cors from "cors";
import { authenticateToken } from "./middleware/authMiddleware";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateToken);
app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

export default app;
