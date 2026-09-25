import {
  pgTable,
  text,
  uuid,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { categoryTable } from "./categories";

export const productTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: doublePrecision("base_price").notNull(),
  categoryName: text("category_name")
    .notNull()
    .references(() => categoryTable.name, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
