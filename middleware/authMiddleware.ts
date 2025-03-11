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
  console.log("req.body", req.body);

  const validation = user.safeParse(req.body);
  if (!validation.success) {
    res.json({
      message: "Validation error",
      ...validation,
    });
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
    res.json({
      message: "Validation error",
      ...validation,
    });
    return;
  }

  next();
};

const authenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

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
};

export { registerMiddleware, loginMiddleware, authenticatedMiddleware };
