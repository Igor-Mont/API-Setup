import { Router } from "express";
import multer from "multer";
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { ResetPasswordUserController } from "@modules/users/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import uploadConfig from "../../../../config/upload";
import { UpdateUserAvatarController } from "@modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

const routes = Router();

routes.post("/users", createUserController.handle);
routes.post("/sessions", authenticateUserController.handle);
routes.post("/forgot", sendForgotPasswordMailController.handle);
routes.patch("/reset", resetPasswordController.handle);
routes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { routes };