import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { categoryTable } from "./categories";
import { relations } from "drizzle-orm";
import { productVariantTable } from "./productVariants";
import { wishListTable } from "./wishlist";

export const productTable = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price").notNull(),
  categoryName: text("category_name")
    .notNull()
    .references(() => categoryTable.name, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryName],
    references: [categoryTable.name],
  }),
  variants: many(productVariantTable),
  wishList: many(wishListTable),
}));
