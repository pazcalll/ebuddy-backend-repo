import { NextFunction, Request, Response } from "express";
import { admin } from "../config/firebaseConfig";
import { LoginSchema, RegisterSchema } from "../entities/auth";

const registerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = RegisterSchema.safeParse(req.body);
  if (!validation.success) {
    res.json(validation.error.flatten().fieldErrors);
    return;
  }

  next();
};

const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = LoginSchema.safeParse(req.body);
  if (!validation.success) {
    res.json(validation.error.flatten().fieldErrors);
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

  return;
};

export { registerMiddleware, loginMiddleware, authenticatedMiddleware };
