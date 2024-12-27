import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_TOKEN: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_TOKEN: process.env.DATABASE_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});

export default env;
