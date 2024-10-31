import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const categoriesTable = sqliteTable("categories", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});
