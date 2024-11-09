import type { Config } from "drizzle-kit";
import env from "./server/env";

export default {
  dialect: "sqlite",
  schema: "./server/db/schema/*.ts",
  out: "./server/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN,
  },
} satisfies Config;
