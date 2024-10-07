import type { Config } from 'drizzle-kit';
import { DATABASE_TOKEN, DATABASE_URL } from './lib/env';

export default {
  dialect: 'sqlite',
  schema: './lib/db/schema/*.ts',
  out: './lib/db/migrations',
  driver: 'turso',
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_TOKEN,
  },
} satisfies Config;
