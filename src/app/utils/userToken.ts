import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { isActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";

export const createUserToken =(user:Partial<IUser>)=>{
     const jwtPayload = {
        email: user.email,
        role: user.role,
        userId:user._id,
      };
    
      //   const accessToken=jwt.sign(jwtPayload,"jwt",{expiresIn:"1d"})
    
     const accessToken =generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE);
    
     const refreshToken=generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRE)

     return {
        accessToken,
        refreshToken
     }
}

export const createNewAccessTokenWithRefreshToken=async(refreshToken:string)=>{
     const verifiedRefreshToken=verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET)as JwtPayload

  const isUserExist = await User.findOne({ email:verifiedRefreshToken.email });

  if (!isUserExist) {
    throw new AppError(400, "user Does not  Exist");
  }
  if(isUserExist.isActive ===isActive.INACTIVE || isActive.BLOCK){
        throw new AppError(400, `user are ${isUserExist.isActive}`);
  }
  if(isUserExist.isDeleted){
        throw new AppError(400, `user are ${isUserExist.isActive}`);
  }
  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
    userId: isUserExist._id,
  };
  //   const accessToken=jwt.sign(jwtPayload,"jwt",{expiresIn:"1d"})
  const accessToken = await generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );
  return accessToken
}