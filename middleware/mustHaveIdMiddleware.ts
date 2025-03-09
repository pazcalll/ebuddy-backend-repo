import { NextFunction, Request, Response } from "express";

const mustHaveIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    res.status(400).send({ message: "ID is required" });
    return;
  }

  next();
};

export default mustHaveIdMiddleware;
