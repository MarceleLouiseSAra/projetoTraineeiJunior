import UserService from "../services/UserService";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
