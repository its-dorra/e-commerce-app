import { drizzle } from "drizzle-orm/libsql";
import env from "../env";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_TOKEN,
});

const db = drizzle(client, { schema });

export default db;
