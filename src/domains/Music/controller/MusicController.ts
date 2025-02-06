import MusicService from "../services/MusicService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const musics = await MusicService.getMusics();
    res.status(statusCodes.SUCCESS).json(musics);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const musicById = await MusicService.getMusicById(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json(musicById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMusic = await MusicService.createMusic(req.body);
      res.status(statusCodes.CREATED).json(newMusic);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedMusic = await MusicService.updateMusic(
        Number(req.params.id),
        req.body,
      );
      res.status(statusCodes.ACCEPTED).json(updatedMusic);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MusicService.deleteMusic(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
