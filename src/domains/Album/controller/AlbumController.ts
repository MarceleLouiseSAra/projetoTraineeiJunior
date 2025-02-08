import AlbumService from "../services/AlbumService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/authentications";

const router = Router();

router.get("/", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const albums = await AlbumService.getAlbums();
    res.status(statusCodes.SUCCESS).json(albums);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const albumById = await AlbumService.getAlbumById(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json(albumById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newAlbum = await AlbumService.createAlbum(req.body);
      res.status(statusCodes.CREATED).json(newAlbum);
    } catch (error) {
      next(error);
    }

    res.json();
  },
);

router.put(
  "/update/:id", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedAlbum = await AlbumService.updateAlbum(
        Number(req.params.id),
        req.body,
      );
      res.status(statusCodes.ACCEPTED).json(updatedAlbum);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete/:id", checkRole, verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AlbumService.deleteAlbum(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
