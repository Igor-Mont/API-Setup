import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const routes = Router();

routes.post("/users", createUserController.handle);
routes.post("/sessions", authenticateUserController.handle);

export { routes };