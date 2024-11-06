import express from "express";
import {
  registerUser,
  getUserByEmail,
  loginUser,
  getAllUsers,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/:email", getUserByEmail);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);

export default userRouter;
