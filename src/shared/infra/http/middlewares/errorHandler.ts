import { NextFunction, Response, Request } from "express";

import AppError from "@shared/errors/AppError";

export default function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });

  next();
}
