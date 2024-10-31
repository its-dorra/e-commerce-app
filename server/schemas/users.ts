import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Provide a valid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Provide a valid email"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  fullName: z
    .string()
    .regex(
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
      "Provide a valid name",
    ),
});
