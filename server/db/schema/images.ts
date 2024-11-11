import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { productColorsTable } from "./productVariants";
import { relations } from "drizzle-orm";

export const imagesTable = sqliteTable(
  "images",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productColorId: integer("product_color_id")
      .notNull()
      .references(() => productColorsTable.id, { onDelete: "cascade" }),
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
        table.productColorId,
      ),
      orderIdx: index("display_order_idx").on(
        table.productColorId,
        table.displayOrder,
      ),
    };
  },
);

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  productColor: one(productColorsTable, {
    fields: [imagesTable.productColorId],
    references: [productColorsTable.id],
  }),
}));
