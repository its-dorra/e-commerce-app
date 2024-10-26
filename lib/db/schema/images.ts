import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { products } from "./products";

export const images = sqliteTable("images", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  product_id: integer("product_id", { mode: "number" })
    .notNull()
    .references(() => products.id),
  image_path: text("image_path").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});
