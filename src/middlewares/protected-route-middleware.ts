import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { environment } from "../utils/env";

function protectedRouteMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return response.status(401).json({
      error: {
        code: "token_missing",
        message: "The token is missing",
      },
    });
  }

  try {
    const parsedToken = jwt.verify(token, environment.secret) as JwtPayload;
    const expirationTime = Number(parsedToken.exp) * 1000;

    if (new Date().getTime() > expirationTime) {
      throw new Error("Token is expired");
    }

    request.userId = parsedToken.sub!;

    return next();
  } catch (error) {
    console.log((error as any)?.message);

    return response.status(401).json({
      error: {
        code: "invalid_token",
        message: "The token is invalid or expired",
      },
    });
  }
}

export { protectedRouteMiddleware };
