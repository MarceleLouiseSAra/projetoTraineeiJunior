import ArtistService from "../services/ArtistService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artists = await ArtistService.getArtists();
    res.status(statusCodes.SUCCESS).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artistById = await ArtistService.getArtistById(
        Number(req.params.id),
      );
      res.status(statusCodes.SUCCESS).json(artistById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/post",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newArtist = await ArtistService.createArtist(req.body);
      res.status(statusCodes.CREATED).json(newArtist);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedArtist = await ArtistService.updateArtist(
        Number(req.params.id),
        req.body,
      );
      res.status(statusCodes.ACCEPTED).json(updatedArtist);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ArtistService.deleteArtist(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
