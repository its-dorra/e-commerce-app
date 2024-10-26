import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { usersTable as users } from "./users";
import { productVariants } from "./productVariants";

export const carts = sqliteTable("carts", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const cartItems = sqliteTable("cart_items", {
  cart_item_id: integer("cart_item_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  product_variant_id: integer("product_variant_id")
    .notNull()
    .references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  cart_id: integer("cart_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});
