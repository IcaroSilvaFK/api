import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const KEY = process.env.KEY;

export function authorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const [, token] = request.headers.authorization!.split(" ");

    if (!token) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }
    jwt.verify(token, KEY as string);
    next();
  } catch (error) {
    return response.status(401).json({
      message: "Unauthorized",
    });
  }
}
