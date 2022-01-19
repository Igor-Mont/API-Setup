import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { ResetPasswordUserController } from "@modules/users/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/users/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

const routes = Router();

routes.post("/users", createUserController.handle);
routes.post("/sessions", authenticateUserController.handle);
routes.post("/forgot", sendForgotPasswordMailController.handle);
routes.patch("/reset", resetPasswordController.handle);

export { routes };