import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { categoriesTable } from "./categories";
import { relations } from "drizzle-orm";
import { productColorsTable } from "./productVariants";

export const productsTable = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: integer("base_price").notNull(), // SQLite doesn't have a decimal type, so we use text
  categoryId: integer("category_id", { mode: "number" }).references(
    () => categoriesTable.id,
  ),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
  productColor: many(productColorsTable),
}));
