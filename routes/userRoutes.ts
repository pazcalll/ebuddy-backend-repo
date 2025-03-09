import express, { Request, Response } from "express";
import postMiddleware from "../middleware/postMiddleware";
import mustHaveIdMiddleware from "../middleware/mustHaveIdMiddleware";
import { fetchUserData, postUserData, updateUserData } from "../controller/api";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from user routes");
});
router.get("/fetch-user-data", fetchUserData);
router.put(
  "/update-user-data/:id",
  postMiddleware,
  mustHaveIdMiddleware,
  updateUserData
);
router.post("/post-user-data", postMiddleware, postUserData);

export default router;
