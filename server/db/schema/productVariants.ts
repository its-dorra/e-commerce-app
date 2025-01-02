import {
  sqliteTable,
  integer,
  uniqueIndex,
  text,
  real,
} from "drizzle-orm/sqlite-core";
import { productTable } from "./products";
import { colorTable } from "./colors";
import { relations } from "drizzle-orm";
import { imageTable } from "./images";
import { cartItemTable } from "./carts";

export const productVariantTable = sqliteTable(
  "product_variant",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productId: integer("product_id", { mode: "number" })
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
    colorName: text("color_name")
      .notNull()
      .references(() => colorTable.name),
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
        table.colorName,
      ),
    };
  },
);

export const sizeTable = sqliteTable(
  "sizes",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productVariantId: integer("product_variant_id", { mode: "number" })
      .notNull()
      .references(() => productVariantTable.id, { onDelete: "cascade" }),
    size: text("size", {
      enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    }).notNull(),
    priceAdjustment: real("price_adjustment").default(0),
    quantity: integer("quantity", { mode: "number" }).notNull().default(0),
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
        table.productVariantId,
        table.size,
      ),
    };
  },
);

export const productVariantRelations = relations(
  productVariantTable,
  ({ one, many }) => ({
    product: one(productTable, {
      fields: [productVariantTable.productId],
      references: [productTable.id],
    }),
    color: one(colorTable, {
      fields: [productVariantTable.colorName],
      references: [colorTable.name],
    }),
    images: many(imageTable),
    sizes: many(sizeTable),
  }),
);

export const sizeRelations = relations(sizeTable, ({ one, many }) => ({
  variant: one(productVariantTable, {
    fields: [sizeTable.productVariantId],
    references: [productVariantTable.id],
  }),
  cartItem: many(cartItemTable),
}));
