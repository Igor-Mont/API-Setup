import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
