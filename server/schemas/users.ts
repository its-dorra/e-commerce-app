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

export const updateUserInformationSchema = z
  .object({
    displayName: z
      .string()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Please enter a valid full name")
      .optional(),
    password: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length >= 8,
        "Password must contain at least 8 characters",
      ),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((data) => data.password || data.displayName);
