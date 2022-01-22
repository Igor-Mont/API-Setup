import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const user_id = request.user_id;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(user_id);

  if(!user.isAdmin) throw new AppError("User isn't admin");

  return next();
}

export { ensureAdmin };