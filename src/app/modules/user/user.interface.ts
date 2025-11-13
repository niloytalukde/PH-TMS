
import { ObjectId, Types } from 'mongoose';

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IauthProvider {
    provider: "Google" | "Credentials";
    providerId: string;
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCK = "BLOCK"
}

export interface IUser {
    _id?:ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: isActive;
    isVerified?: boolean;

    auth: IauthProvider[];
    role: Role;
    booking?: Types.ObjectId;
    guides?: Types.ObjectId[];
}