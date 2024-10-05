import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TOKEN: z.string(),
});

export const { DATABASE_TOKEN, DATABASE_URL } = envSchema.parse(process.env);
