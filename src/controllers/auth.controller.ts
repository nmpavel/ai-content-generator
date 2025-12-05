import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await AuthService.register(name, email, password);
    return res.status(201).json({
      message: "User registered successfully.",
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    return res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
