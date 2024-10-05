import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DATABASE_TOKEN, DATABASE_URL } from '../env';

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});

export const db = drizzle(client);
