import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { productTable } from "./products";

export const categoryTable = sqliteTable("category", {
  name: text("name").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const categoryRelations = relations(categoryTable, ({ one }) => ({
  product: one(productTable),
}));
