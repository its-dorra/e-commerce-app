import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { productVariantTable } from "./productVariants";

export const imageTable = sqliteTable(
  "image",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productVariantId: integer("product_variant_id")
      .notNull()
      .references(() => productVariantTable.id, { onDelete: "cascade" }),
    imagePath: text("image_path").notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    imageType: text("image_type")
      .$type<"product" | "gallery">()
      .notNull()
      .default("gallery"),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      productColorIdx: index("product_color_images_idx").on(
        table.productVariantId,
      ),
      orderIdx: index("display_order_idx").on(
        table.productVariantId,
        table.displayOrder,
      ),
    };
  },
);

export const imageRelations = relations(imageTable, ({ one }) => ({
  variant: one(productVariantTable, {
    fields: [imageTable.productVariantId],
    references: [productVariantTable.id],
  }),
}));
