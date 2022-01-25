import { AppError } from "@shared/infra/http/errors/AppError";
import { NextFunction, Request, Response } from "express";

async function asyncErrors(err: Error, request: Request, response: Response, next: NextFunction) {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
}

export { asyncErrors };