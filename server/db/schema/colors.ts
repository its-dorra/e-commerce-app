import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const colorTable = pgTable("colors", {
  name: text("name").primaryKey(),
  hexCode: text("hex_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
