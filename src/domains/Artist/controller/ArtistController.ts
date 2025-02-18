import ArtistService from "../services/ArtistService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/authentications";

const router = Router();

router.get("/", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkRole(["ADMIN", "USER"], req, res, next);
    const artists = await ArtistService.getArtists();
    res.status(statusCodes.SUCCESS).json(artists);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN", "USER"], req, res, next);
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
  "/create", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
      const newArtist = await ArtistService.createArtist(req.body);
      res.status(statusCodes.CREATED).json(newArtist);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update/:id", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
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
  "/delete/:id", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
      await ArtistService.deleteArtist(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
