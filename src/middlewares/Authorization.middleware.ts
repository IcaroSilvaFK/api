import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const KEY = process.env.KEY;

export function authorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const autheticationToken = request.headers.authorization;

  if (!autheticationToken) {
    return response.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const [, token] = autheticationToken.split(" ");

    jwt.verify(token, KEY as string);
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid",
    });
  }
}
