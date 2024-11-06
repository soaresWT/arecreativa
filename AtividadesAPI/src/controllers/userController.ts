import { Request, Response } from "express";
import { login } from "../services/authService";
import { UserService } from "../services/userService";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await userService.findUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "An unknown error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
