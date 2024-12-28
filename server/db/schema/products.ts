import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { categoriesTable } from "./categories";
import { relations } from "drizzle-orm";
import { productColorsTable } from "./productVariants";
import { wishListTable } from "./wishlist";

export const productsTable = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price").notNull(),
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
  wishList: many(wishListTable),
}));
