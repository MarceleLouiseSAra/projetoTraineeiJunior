import MusicService from "../services/MusicService";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/:get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const musics = await MusicService.getMusics();
    res.json(musics);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:getById",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const musicById = await MusicService.getMusicById(Number(req.params.id));
      res.json(musicById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMusic = await MusicService.createMusic(req.body);
      res.json(newMusic);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:update",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedMusic = await MusicService.updateMusic(
        Number(req.params.update),
        req.body,
      );
      res.json(updatedMusic);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await MusicService.deleteMusic(Number(req.params.delete));
      res.json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
