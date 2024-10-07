import { drizzle } from 'drizzle-orm/libsql';
import { DATABASE_TOKEN, DATABASE_URL } from '../env';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});

export const db = drizzle(client, { schema });
