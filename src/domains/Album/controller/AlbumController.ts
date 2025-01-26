import AlbumService from "../services/AlbumService";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/:get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const albums = await AlbumService.getAlbums();
    res.json(albums);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:getById",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const albumById = await AlbumService.getAlbumById(Number(req.params.id));
      res.json(albumById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newAlbum = await AlbumService.createAlbum(req.body);
      res.json(newAlbum);
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
      const updatedAlbum = await AlbumService.updateAlbum(
        Number(req.params.update),
        req.body,
      );
      res.json(updatedAlbum);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AlbumService.deleteAlbum(Number(req.params.delete));
      res.json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
