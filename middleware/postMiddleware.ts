import { Request, Response } from "express";
import z from "zod";

export default function postMiddleware(req: Request, res: Response, next: any) {
  const validationOptions = {
    required_error: "This field is required",
  };

  const user = z.object({
    totalAverageWeightRatings: z.number(validationOptions),
    numberOfRents: z.number(validationOptions),
    recentlyActive: z.number(validationOptions),
  });

  const validation = user.safeParse(req.body);
  if (!validation.success) {
    res.json(validation);
    return;
  }

  next();
}
