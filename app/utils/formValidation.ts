import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const loginSchema = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(8).min(1, { message: "Password is required" }),
  })
);

export const registrationSchema = withZod(
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
);

export const editSchema = withZod(
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
  })
);
