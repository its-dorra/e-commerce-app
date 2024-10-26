import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";

export const products = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: text("base_price").notNull(), // SQLite doesn't have a decimal type, so we use text
  categoryId: integer("category_id", { mode: "number" }).references(
    () => categories.id,
  ),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});
