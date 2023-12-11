import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const loginSchema = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(10).min(1, { message: "Password is required" }),
  })
);
