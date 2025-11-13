/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


// const createUser = async (req: Request, res: Response,next:NextFunction) => {
//   try {
//     const user = await userServices.createUserService(req.body);

//     res.status(201).json({
//       message: "User Created Successfully",
//       user,
//     });
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error);
//     next(error)
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUserService(req.body);

    sendResponse(res, {
      success: true,
      message: "User Created Successfully",
      statusCode: 201,
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();

    // res.status(201).json({
    //   success: true,
    //   message: "All User Retrieve Successfully",
    //   users,
    // });
    sendResponse(res, {
      success: true,
      message: "All User Retrieve Successfully",
      statusCode: 201,
      data: result,
    });
  }
);

const newUpdatedUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token=req.headers.authorization as string
    // const verifiedToken=verifyToken(token,envVars.JWT_ACCESS_SECRET) as JwtPayload
    const verifiedToken = req.user as JwtPayload;
    if (!verifiedToken) {
      throw new Error("Unauthorized: No user token found");
    }

    const payload = req.body;
    const user = await userServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      message: "User Updated Successfully",
      statusCode: 201,
      data: user,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
  newUpdatedUser,
};
