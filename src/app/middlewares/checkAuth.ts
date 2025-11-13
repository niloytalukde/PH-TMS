import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import {  verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from 'jsonwebtoken';
export const checkAuth =(...authRole :string[])=> async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;

  try {
    if (!accessToken) {
      throw new AppError(400, "No Access Token");
    }
    // const verifiedToken = await jwt.verify(accessToken, "jwt");
 const verifiedToken= verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload

    if (!authRole.includes(verifiedToken.role)) {
      throw new AppError(400, "You are Not Permitted");
    }
    req.user=verifiedToken
    next()
  } catch (error) {
    next(error);
  }
};