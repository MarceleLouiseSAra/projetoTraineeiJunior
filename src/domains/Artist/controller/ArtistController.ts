import ArtistService from "../services/ArtistService";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artists = await ArtistService.getArtists();
    res.json(artists);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:getById",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artistById = await ArtistService.getArtistById(
        Number(req.params.id),
      );
      res.json(artistById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newArtist = await ArtistService.createArtist(req.body);
      res.json(newArtist);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:update",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedArtist = await ArtistService.updateArtist(
        Number(req.params.update),
        req.body,
      );
      res.json(updatedArtist);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ArtistService.deleteArtist(Number(req.params.delete));
      res.json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
