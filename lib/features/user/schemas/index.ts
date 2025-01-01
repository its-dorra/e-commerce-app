import { z } from "zod";

export const updateAccountDetailsSchema = z
  .object({
    displayName: z
      .string()
      .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Please enter a valid full name"),
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
  });
