import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token obrigatório", 401);
  }

  const splitToken = token.split(" ");

  jwt.verify(splitToken[1], process.env.SECRET_KEY as string, (error: any, decoded: any) => {
    if (error) {
      throw new AppError("Token inválido", 401);
    }

    res.locals.userId = decoded.id;
  });
  next();
};
