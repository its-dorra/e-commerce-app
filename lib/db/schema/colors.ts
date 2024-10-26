import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const colors = sqliteTable(
  "colors",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    name: text("name").notNull(),
    hex_code: text("hex_code").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$default(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      colorNameIdx: index("color_name_idx").on(table.name),
    };
  },
);
