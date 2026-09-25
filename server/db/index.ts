import { relations } from "./schema/relations";
import env from "../env";

import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(env.DATABASE_URL, { relations });

export default db;
