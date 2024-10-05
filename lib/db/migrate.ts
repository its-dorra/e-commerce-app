import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { DATABASE_TOKEN, DATABASE_URL } from '../env';

// for migrations
const migrationClient = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_TOKEN,
});

const migrateDB = async () => {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: './lib/db/migration',
    });

    migrationClient.close();
  } catch (error) {
    console.log(error);
  }
};

migrateDB();
