import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { productVariantTable } from "./productVariants";

export const colorTable = sqliteTable(
  "colors",
  {
    name: text("name").primaryKey(),
    hexCode: text("hex_code").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      colorNameIdx: index("color_name_idx").on(table.name),
    };
  },
);

export const colorRelations = relations(colorTable, ({ one }) => ({
  variant: one(productVariantTable),
}));
