import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../utils/error";

function appErrorHandler(controller: RequestHandler) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await controller(request, response, next);
    } catch (rawError) {
      const error = rawError as AppError;

      return response.status(error?.statusCode || 500).json({
        error: {
          message: error?.message || "Unknown error",
          code: error?.name || "unknown",
        },
      });
    }
  };
}

export { appErrorHandler };
