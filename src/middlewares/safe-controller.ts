import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../utils/error";
import { ZodError } from "zod";

function safeController(controller: RequestHandler) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await controller(request, response, next);
    } catch (rawError) {
      const error = rawError as AppError;

      if (error instanceof ZodError) {
        return response.status(400).json({
          error: {
            message: "Validation error",
            code: "validation_error",
            details: error.errors,
          },
        });
      }

      return response.status(error?.statusCode || 500).json({
        error: {
          message: error?.message || "Unknown error",
          code: error?.name || "unknown",
        },
      });
    }
  };
}

export { safeController };
