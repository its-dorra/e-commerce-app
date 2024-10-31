import {
  sqliteTable,
  integer,
  uniqueIndex,
  index,
  text,
} from "drizzle-orm/sqlite-core";
import { productsTable } from "./products";
import { colorsTable } from "./colors";
import { sizesTable } from "./sizes";

export const productColorsTable = sqliteTable(
  "product_colors",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productId: integer("product_id", { mode: "number" })
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }),
    colorId: integer("color_id", { mode: "number" })
      .notNull()
      .references(() => colorsTable.id),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      productColorUnique: uniqueIndex("product_color_unique_idx").on(
        table.productId,
        table.colorId,
      ),
    };
  },
);

export const productVariantsTable = sqliteTable(
  "product_variants",
  {
    id: integer("variant_id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productColorId: integer("product_color_id", { mode: "number" })
      .notNull()
      .references(() => productColorsTable.id, { onDelete: "cascade" }),
    sizeId: integer("size_id", { mode: "number" })
      .notNull()
      .references(() => sizesTable.id),
    price_adjustment: integer("price_adjustment").default(0),
    quantity: integer("quantity", { mode: "number" }).notNull().default(0),
    low_stock_threshold: integer("low_stock_threshold").default(5),
    is_active: integer("is_active", { mode: "boolean" })
      .notNull()
      .default(true),
    dimensions: text("dimensions"),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      variantUnique: uniqueIndex("variant_unique_idx").on(
        table.productColorId,
        table.sizeId,
      ),
      stockIdx: index("stock_idx").on(table.quantity),
      activeIdx: index("active_idx").on(table.is_active),
    };
  },
);
