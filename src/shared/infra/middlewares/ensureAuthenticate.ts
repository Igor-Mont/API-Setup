import auth from "../../../config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../http/errors/AppError";

interface ITokenPayload {
  id: string;
}

async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if(!authorization) throw new AppError("Token missing!", 401);

  const token = authorization.replace("Bearer", '').trim();

  try {
    const data = verify(token, auth.secret_token);
    const { id } = data as ITokenPayload;

    request.user_id = id;

    return next();
  } catch (error) {
    console.error(error);
  }
}

export { ensureAuthenticate };