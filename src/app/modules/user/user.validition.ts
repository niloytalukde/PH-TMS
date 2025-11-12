import z from "zod";
import { Types } from "mongoose";



// Auth provider schema
const authProviderSchema = z.object({
  provider: z.string(),
  id: z.string()
});

// Role enum (adjust values if your project uses different role names)
const RoleEnum = z.enum(["user", "admin", "guide"]);

export const userSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .optional(),

  picture: z.string().url({ message: "Invalid picture URL" }).optional(),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }).optional(),
  auth: z
    .array(authProviderSchema, {
      message: "At least one auth provider is required",
    })
    .nonempty({ message: "Auth providers cannot be empty" }).optional(),

//   auth: z.array(IauthProvide, {
//       message: "At least one auth provider is required",
//     })
//     .nonempty({ message: "Auth providers cannot be empty" }),

  role: RoleEnum .optional(),

  booking: z
    .instanceof(Types.ObjectId)
    .or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ObjectId"))
    .optional(),

  guides: z
    .array(
      z
        .instanceof(Types.ObjectId)
        .or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid guide ObjectId"))
    )
    .optional(),
});
export const updateUserZodSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .optional(),

  picture: z.string().url({ message: "Invalid picture URL" }).optional(),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }).optional(),
  auth: z
    .array(authProviderSchema, {
      message: "At least one auth provider is required",
    })
    .nonempty({ message: "Auth providers cannot be empty" }).optional(),

//   auth: z.array(IauthProvide, {
//       message: "At least one auth provider is required",
//     })
//     .nonempty({ message: "Auth providers cannot be empty" }),

  role: RoleEnum .optional(),

  booking: z
    .instanceof(Types.ObjectId)
    .or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid booking ObjectId"))
    .optional(),

  guides: z
    .array(
      z
        .instanceof(Types.ObjectId)
        .or(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid guide ObjectId"))
    )
    .optional(),
});
