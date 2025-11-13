/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/appError";
import {  IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { generateToken,} from "../../utils/jwt";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(400, "Email Does not  Exist");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(400, "Incorrect  password  Does not  Match");
  }

  const jwtPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
    userId: isUserExist._id,
  };

  //   const accessToken=jwt.sign(jwtPayload,"jwt",{expiresIn:"1d"})

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRE
  );

  delete isUserExist.password;
  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};
const getNewAccessToken = async (refreshToken:string) => {
const newAccessToken =createNewAccessTokenWithRefreshToken(refreshToken)
 return{
  accessToken:newAccessToken
 }
};
const resetPassword = async (decodedToken:JwtPayload,oldPassword:string,newPassword:string) => {

  const user =await User.findById(decodedToken.userId)

  const isOldPasswordMatch= await bcryptjs.compare(oldPassword,user!.password as string)

  if(isOldPasswordMatch){
    throw new AppError(400,"password are not match")
  }
user!.password=await bcryptjs.hash(newPassword,Number(envVars.BCRYPT_SALT_ROUND))

user!.save()

return true
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword
};
