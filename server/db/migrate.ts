import { migrate } from "drizzle-orm/libsql/migrator";
import db from ".";

const migrateDB = async () => {
  try {
    console.log("Running migrations ....");

    await migrate(db, {
      migrationsFolder: "./lib/db/migrations",
    });

    console.log("Migrations ran successfully.");
  } catch (error) {
    console.log(error);
  }
};

migrateDB();
