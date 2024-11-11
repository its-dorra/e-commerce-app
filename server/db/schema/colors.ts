import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { productColorsTable } from "./productVariants";

export const colorsTable = sqliteTable(
  "colors",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    name: text("name").notNull(),
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

export const colorsRelations = relations(colorsTable, ({ one }) => ({
  productColor: one(productColorsTable),
}));
