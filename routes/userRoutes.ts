import express, { Request, Response } from "express";
import postMiddleware from "../middleware/postMiddleware";
import mustHaveIdMiddleware from "../middleware/mustHaveIdMiddleware";
import {
  fetchUserData,
  login,
  postUserData,
  register,
  updateUserData,
} from "../controller/api";
import {
  loginMiddleware,
  registerMiddleware,
} from "../middleware/authMiddleware";

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
router.post("/register", registerMiddleware, register);
router.post("/login", loginMiddleware, login);

export default router;
