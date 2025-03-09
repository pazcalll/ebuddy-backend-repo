import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase/auth";
import { z } from "zod";
import { app, admin } from "../config/firebaseConfig";

const registerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationOptions = {
    required_error: "This field is required",
  };

  const user = z
    .object({
      email: z.string(validationOptions).min(6).max(64),
      password: z.string(validationOptions).min(6).max(64),
      confirmPassword: z.string(validationOptions).min(6).max(64),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    });

  const validation = user.safeParse(req.body);
  if (!validation.success) {
    res.json(validation);
    return;
  }
  console.log("validation", validation);

  next();
};

const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationOptions = {
    required_error: "This field is required",
  };

  const user = z.object({
    email: z.string(validationOptions).min(6).max(64),
    password: z.string(validationOptions).min(6).max(64),
  });

  const validation = user.safeParse(req.body);
  if (!validation.success) {
    res.json(validation);
    return;
  }

  next();
};

const authenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["access-token"];

  if (!token) res.status(401).json({ message: "Unauthorized" });

  try {
    const verificationResponse = await admin
      .auth()
      .verifyIdToken(token as string);
    if (verificationResponse.email == undefined)
      throw new Error("Unauthorized");

    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error?.message });
  }

  return;

  next();
};

export { registerMiddleware, loginMiddleware, authenticatedMiddleware };
