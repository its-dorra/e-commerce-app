import {
  index,
  integer,
  pgTable,
  text,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { productVariantTable } from "./productVariants";

export const imageTable = pgTable(
  "image",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productVariantId: uuid("product_variant_id")
      .notNull()
      .references(() => productVariantTable.id, { onDelete: "cascade" }),
    imagePath: text("image_path").notNull(),
    displayOrder: integer("display_order").notNull().default(1),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("product_color_images_idx").on(table.productVariantId),
    index("display_order_idx").on(table.productVariantId, table.displayOrder),
  ],
);
