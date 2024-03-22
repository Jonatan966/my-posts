import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";

export function appErrorHandler(
  error: AppError,
  _: Request,
  res: Response,
  _2: NextFunction
) {
  return res.status(error?.statusCode || 500).json({
    error: {
      message: error?.message || "Unknown error",
      code: error?.name || "unknown",
    },
  });
}
