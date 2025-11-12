/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setAuthcookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import passport from "passport";


const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body);
    // const resolvedLoginInfo = {
    //   ...loginInfo,
    //   accessToken: await loginInfo.accessToken,
    //   refreshToken: await loginInfo.refreshToken,
    // };
    passport.authenticate("local",async(err:any, user:any ,info :any)=>{

if(err){
  return next(new AppError(401, info.message))
}

if(!user){
  return next(new AppError(401, info.message))
}

const userToken = await createUserToken(user) 

// resolve token promises if createUserToken returns promises for tokens
const resolvedUserToken = {
  accessToken: await userToken.accessToken,
  refreshToken: await userToken.refreshToken,
}

delete user.toObject().password
 setAuthCookie(res, resolvedUserToken);
    sendResponse(res, {
      success: true,
      message: "Login Successfully",
      statusCode: 201,
      data: {
        accessToken: resolvedUserToken.accessToken,
        refreshToken: resolvedUserToken.refreshToken,
        user:user

      }
      
    });
    })(req,res,next)
   
  }
);
const getNewAccessLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(400, "No Refresh Token ");
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    sendResponse(res, {
      success: true,
      message: "New access Token create  Successfully",
      statusCode: 201,
      data: tokenInfo,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    const newUpdatePassword = await AuthServices.resetPassword(
      decodedToken,
      oldPassword,
      newPassword
    );

    sendResponse(res, {
      success: true,
      message: "Login Successfully",
      statusCode: 201,
      data: newUpdatePassword,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      message: "Login Successfully",
      statusCode: 201,
      data: null,
    });
  }
);
const googleCallback = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let state = req.query.state ? (req.query.state as string) : "";

    if (state.startsWith("/")) {
      state = state.slice(1);
    }

    const user = req.user;
    if (!user) {
      throw new AppError(400, "Not found");
    }
    const tokenInfo = createUserToken(user);
    const resolvedTokenInfo = {
      accessToken: await tokenInfo.accessToken,
      refreshToken: await tokenInfo.refreshToken,
    };
    setAuthCookie(res, resolvedTokenInfo);
    res.redirect(`${envVars.FRONTEND_URL}/${state}`);
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessLogin,
  logout,
  resetPassword,
  googleCallback,
};
