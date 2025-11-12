/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandlers = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something Went Wrong ${err.message} from global error`;
  const errorSource: any = [];
  //  Handel mongoose error
  if (err.code === 11000) {
    const matchArray = err.message.match(/"([^"])"/);
    statusCode = 400;
    message = `${matchArray[1]} already exists`;
  }
  // Cast Error
  else if (err.name === "castError") {
    statusCode = 400;
    message = "Invalid MongoDB objectid";
  }
  // mongoose validation Error
  else if (err.name === "Validation Error ") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObject: any) =>
      errorSource.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );

    message = "Validation error";
  }
  // Zod validation error
  else if (err.name === "ZodError") {
    statusCode = 400;
    message = "ZodError";
    err.issues.forEach((issue: any) => {
      errorSource.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  } else if (err instanceof AppError) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (statusCode = err.statusCode), (message = err.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE === "development" && err.stack,
  });
};
