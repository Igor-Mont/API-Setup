import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import uploadConfig from "../../../../config/upload";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);


export { usersRoutes };