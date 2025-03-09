import express, { Request, Response } from "express";
import postUserData from "../repository/userCollection";
import postMiddleware from "../middleware/postMiddleware";

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
router.post("/post-user-data", postMiddleware, postUserData);

export default router;
