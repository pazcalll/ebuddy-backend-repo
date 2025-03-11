import { Request, Response } from "express";
import { UserSchema } from "../entities/user";

export default function postMiddleware(req: Request, res: Response, next: any) {
  const validation = UserSchema.safeParse(req.body);
  if (!validation.success) {
    res.json(validation.error.flatten().fieldErrors);
    return;
  }

  next();
}
