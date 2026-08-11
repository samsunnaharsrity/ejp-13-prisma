import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "./auth.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("🔥 REGISTER CONTROLLER HIT");
    console.log("🔥 REQUEST BODY:", req.body);

    const result = await registerUser(req.body);

    console.log("🔥 REGISTER SERVICE RESULT:", result);
    console.log("🔥 TOKEN:", result.token);
    console.log("🔥 USER:", result.user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    console.error("🔥 REGISTER ERROR:", error);

    return res.status(400).json({
      success: false,
      message:
        error?.message || "Registration failed",
      data: null,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    console.error("Login error:", error);

    return res.status(401).json({
      success: false,
      message:
        error?.message || "Login failed",
      data: null,
    });
  }
};

export const me = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await getMe(req.user!.userId);

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Get me error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message || "User not found",
      data: null,
    });
  }
};
