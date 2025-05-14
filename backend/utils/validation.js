import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(4, "Name is required").max(60, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(16, "Password must be at most 16 characters long"),
});

//  store schema
export const storeSchema = z.object({
  storename: z.string().min(4, "Name is required").max(60, "Name is too long"),
  storaddress: z
    .string()
    .min(4, "Address is required")
    .max(400, "Address is too long"),
  storemail: z.string().email("Invalid email address"),
});
