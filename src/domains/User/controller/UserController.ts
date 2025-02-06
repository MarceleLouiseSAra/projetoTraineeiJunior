import UserService from "../services/UserService";
import MusicService from "../../Music/services/MusicService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getUsers();
    res.status(statusCodes.SUCCESS).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userById = await UserService.getUserById(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json(userById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(statusCodes.CREATED).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/account/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await UserService.updateUser(
        Number(req.params.id),
        req.body,
      );
      res.status(statusCodes.ACCEPTED).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json()
    } catch (error) {
      next(error);
    }
  },
);

router.put("/account/listen/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const musicById = await MusicService.getMusicById(Number(req.params.id));
    } catch (error) {
      next(error)
    }
  }
)

router.put("/account/unlisten/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const musicById = await MusicService.getMusicById(Number(req.params.id));
    } catch (error) {
      next(error)
    }
  }
)

export default router;
