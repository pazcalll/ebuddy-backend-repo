import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const registerMiddleware = async (
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
    confirmPassword: z.string(validationOptions).min(6).max(64),
  });

  const validation = user.safeParse(req.body);
  if (!validation.success) {
    res.json(validation);
    return;
  }

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

export { registerMiddleware, loginMiddleware };
