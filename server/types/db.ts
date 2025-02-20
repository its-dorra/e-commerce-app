import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { ExtractTablesWithRelations } from "drizzle-orm/relations";
import * as schema from "@/server/db/schema";

export type Transaction = SQLiteTransaction<
  "async",
  any,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;
