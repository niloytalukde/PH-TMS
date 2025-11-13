import { model, Schema } from "mongoose";
import { IauthProvider, isActive, IUser, Role } from "./user.interface";
import { boolean } from "zod";

// Auth Provider Schema
const authProviderSchema = new Schema<IauthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { timestamps: true, versionKey: false, _id: false }
);

// User Schema
const userSchema = new Schema<IUser>(
  {
    
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(isActive),
      default: isActive.ACTIVE,
    },
    isVerified: {
      type: boolean,
      enum: Object.values(isActive),
      default: isActive.ACTIVE,
    },
    auth: [authProviderSchema],
    // role: Role;
    // booking?: Types.ObjectId;
    // guides?: Types.ObjectId[];
  },

  { timestamps: true, versionKey: false }
);

export const User =model<IUser>("User",userSchema)
