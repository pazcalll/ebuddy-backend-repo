import express, { Request, Response } from "express";
import postMiddleware from "../middleware/postMiddleware";
import mustHaveIdMiddleware from "../middleware/mustHaveIdMiddleware";
import {
  fetchUserData,
  login,
  postUserData,
  profile,
  register,
  updateUserData,
} from "../controller/api";
import {
  authenticatedMiddleware,
  loginMiddleware,
  registerMiddleware,
} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from user routes");
});
router.get("/fetch-user-data", authenticatedMiddleware, fetchUserData);
router.put(
  "/update-user-data/:id",
  authenticatedMiddleware,
  postMiddleware,
  mustHaveIdMiddleware,
  updateUserData
);
router.post(
  "/post-user-data",
  authenticatedMiddleware,
  postMiddleware,
  postUserData
);
router.post("/register", registerMiddleware, register);
router.post("/login", loginMiddleware, login);
router.get("/profile", authenticatedMiddleware, profile);

export default router;
