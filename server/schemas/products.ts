import { z } from "zod";

export const productQuerySchema = z.object({
  categories: z.string().array().or(z.string()).optional(),
  colors: z.string().array().or(z.string()).optional(),
  sizes: z
    .enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"])
    .array()
    .or(z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"]))
    .optional(),
  page: z.coerce.number().default(1),
});
