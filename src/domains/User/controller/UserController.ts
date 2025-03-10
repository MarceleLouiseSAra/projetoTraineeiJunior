import UserService from "../services/UserService";
import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "../../../../utils/constants/statusCodes";
import { login, checkRole, verifyJWT } from "../../../middlewares/authentications";

const router = Router();

router.get("/", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkRole(["ADMIN"], req, res, next);
    const users = await UserService.getUsers();
    res.status(statusCodes.SUCCESS).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
      const userById = await UserService.getUserById(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json(userById);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/create", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN", "USER"], req, res, next);
      const newUser = await UserService.createUser(req.body);
      res.status(statusCodes.CREATED).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/admin/create", verifyJWT,
  async ( req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
      const userCreatedByAdmin = await UserService.createUser(req.body);
      res.status(statusCodes.CREATED).json(userCreatedByAdmin);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/update/:id", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
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

router.put(
  "/account/update", verifyJWT, 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN", "USER"], req, res, next);
      const updatedUser = await UserService.updateUser(Number(req.user.id_User), req.body);
      res.status(statusCodes.ACCEPTED).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/delete/:id", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN"], req, res, next);
      await UserService.deleteUser(Number(req.params.id));
      res.status(statusCodes.SUCCESS).json()
    } catch (error) {
      next(error);
    }
  },
);

router.post("/login", login);

router.put("/account/listen/:id", verifyJWT, 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN", "USER"], req, res, next);
      await UserService.listenToMusic(Number(req.params.id), Number(req.user.id_User));
      res.status(statusCodes.SUCCESS).json()
    } catch (error) {
      next(error)
    }
  }
);

router.put("/account/unlisten/:id", verifyJWT, 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkRole(["ADMIN", "USER"], req, res, next);
      await UserService.unlistenToMusic(Number(req.params.id), Number(req.user.id_User));
      res.status(statusCodes.SUCCESS).json()
    } catch (error) {
      next(error)
    }
  }
);


router.put("/account/password", verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // checkRole(["ADMIN", "USER"], req, res, next);
      const userId = Number(req.user.id_User); 
      const { currentPassword, newPassword } = req.body;
      await UserService.changePassword(userId, currentPassword, newPassword);
      res.status(statusCodes.SUCCESS).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
