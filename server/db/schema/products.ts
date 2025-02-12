import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { categoryTable } from "./categories";
import { relations } from "drizzle-orm";
import {
  createProductVariantSchema,
  productVariantTable,
} from "./productVariants";
import { wishListTable } from "./wishlist";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const createProductSchema = createInsertSchema(productTable, {
  basePrice: z.coerce.number().min(1, "Put a valid price"),
  name: z.string().min(1, "Put a valid product name"),
  description: z.string().min(5, "Put a valid product description"),
})
  .omit({ id: true, createdAt: true, updatedAt: true })
  .merge(
    z.object({
      variants: z.array(createProductVariantSchema),
    }),
  );

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryName],
    references: [categoryTable.name],
  }),
  variants: many(productVariantTable),
  wishList: many(wishListTable),
}));
