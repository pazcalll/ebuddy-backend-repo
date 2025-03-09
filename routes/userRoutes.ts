import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from user routes");
});
router.get("/fetch-user-data", (req: Request, res: Response) => {
  res.send("Fetching user data");
});
router.get("/update-user-data", (req: Request, res: Response) => {
  res.send("Updating user data");
});

export default router;
