import { z } from "zod";
import { Types } from "mongoose";

export const tourZodSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .trim(),

  slug: z
    .string({
      message: "Slug is required",
    })
    .trim()
    .toLowerCase(),

  images: z.array(z.string()).default([]),

  description: z.string().optional(),

  location: z.string().optional(),

  costFrom: z.number().optional(),

  startDate: z.coerce.date().optional(),

  endDate: z.coerce.date().optional(),

  included: z.array(z.string()).default([]),

  excluded: z.array(z.string()).default([]),

  amenities: z.array(z.string()).default([]),

  tourPlan: z.array(z.string()).default([]),

  maxGuest: z.number().optional(),

  minAge: z.number().optional(),

  division: z
    .string({
      message: "Division ID is required",
    })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid Division ObjectId",
    }),

  tourType: z
    .string({
      message: "TourType ID is required",
    })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid TourType ObjectId",
    }),
});

export type TourZodType = z.infer<typeof tourZodSchema>;
