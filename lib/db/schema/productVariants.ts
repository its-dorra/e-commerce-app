import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { products } from "./products";
import { colors } from "./colors";
import { sizes } from "./sizes";

export const productVariants = sqliteTable("product_variants", {
  id: integer("variant_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  productId: integer("product_id", { mode: "number" })
    .notNull()
    .references(() => products.id),
  colorId: integer("color_id", { mode: "number" })
    .notNull()
    .references(() => colors.id),
  sizeId: integer("size_id", { mode: "number" })
    .notNull()
    .references(() => sizes.id),
  quantity: integer("quantity", { mode: "number" }).notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});
