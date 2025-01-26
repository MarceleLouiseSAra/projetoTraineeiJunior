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

router.get("/:ids", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userById = await UserService.getUserById(Number(req.params.id));
    res.json(userById);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }

    res.json();
  },
);

router.put(
  "/:update",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await UserService.updateUser(
        Number(req.params.update),
        req.body,
      );
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(Number(req.params.delete));
      res.json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
