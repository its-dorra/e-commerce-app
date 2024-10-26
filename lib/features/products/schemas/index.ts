import { z } from "zod";

export const productQuerySchema = z.object({
  categories: z.string().array().or(z.string()).optional(),
  colors: z.string().array().or(z.string()).optional(),
  sizes: z.string().array().or(z.string()).optional(),
  page: z.coerce.number().default(1),
});
