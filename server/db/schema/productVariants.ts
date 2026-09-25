import {
  pgTable,
  uuid,
  integer,
  uniqueIndex,
  text,
  doublePrecision,
  timestamp,
} from "drizzle-orm/pg-core";
import { productTable } from "./products";
import { colorTable } from "./colors";

export const productVariantTable = pgTable(
  "product_variant",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
    colorName: text("color_name")
      .notNull()
      .references(() => colorTable.name),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("product_color_unique_idx").on(
      table.productId,
      table.colorName,
    ),
  ],
);

export const sizeTable = pgTable(
  "sizes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productVariantId: uuid("product_variant_id")
      .notNull()
      .references(() => productVariantTable.id, { onDelete: "cascade" }),
    size: text("size", {
      enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    }).notNull(),
    priceAdjustment: doublePrecision("price_adjustment").default(0),
    quantity: integer("quantity").notNull().default(0),
    dimensions: text("dimensions"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("variant_unique_idx").on(table.productVariantId, table.size),
  ],
);
