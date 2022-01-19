import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();

const routes = Router();

routes.post("/users", createUserController.handle);

export { routes };