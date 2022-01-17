import { CreateUserController } from "@modules/users/useCases/createUserUseCase/CreateUserController";
import { Router } from "express";

const createUserController = new CreateUserController();

const routes = Router();

routes.post("/users", createUserController.handle);

export { routes };