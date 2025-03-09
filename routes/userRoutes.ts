import express, { Request, Response } from "express";
import postMiddleware from "../middleware/postMiddleware";
import { fetchUserData, postUserData } from "../repository/userCollection";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from user routes");
});
router.get("/fetch-user-data", fetchUserData);
router.get("/update-user-data", (req: Request, res: Response) => {
  res.send("Updating user data");
});
router.post("/post-user-data", postMiddleware, postUserData);

export default router;
