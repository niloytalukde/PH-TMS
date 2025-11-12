import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { IauthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from 'bcryptjs';
import { envVars } from "../../config/env";


const createUserService = async (payload: Partial<IUser>) => {
  const { email,password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(400, "user Already Exist");
  }

  const authProvider: IauthProvider = {
    provider: "Credentials",
    providerId: email as string,
  };

const hashedPassword = await bcryptjs.hash(password as string,10)


  const user = await User.create({
    email,
    authProvider,
    password:hashedPassword,
    ...rest,
  });

  return user;
};
const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const updateUser =async(userId :string,payload :Partial<IUser>,decodedToken:JwtPayload)=>{

const isUserExist=await User.findById(userId)
if(!isUserExist){
  throw new AppError(400,"User are nor exist ")
}

if(payload.role){
  if(decodedToken.role===Role.USER || decodedToken.role ===Role.GUIDE){
    throw new AppError(400,"You are not authorize")
  }
  if(payload.role===Role.SUPER_ADMIN && decodedToken.role===Role.ADMIN){
    throw new AppError(400,"You are not authorize")
  }
}

if(payload.password){
  payload.password=await bcryptjs.hash(payload.password,Number(envVars.BCRYPT_SALT_ROUND))
}

const newUpdateUser =await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true})

return newUpdateUser
}


export const userServices = {
  createUserService,
  getAllUsers,
  updateUser
};
