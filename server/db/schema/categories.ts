import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  name: text("name").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
