import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { cartsTable } from "./carts";
import { usersTable as users } from "./users";
import { relations } from "drizzle-orm";

export const ordersTable = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  cartId: integer("cart_id", { mode: "number" })
    .notNull()
    .references(() => cartsTable.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  phone_number: text("phone_number"),
  wilaya: text("wilaya"),
  city: text("city"),
  streetAddress: text("street_address"),
  status: text("status")
    .$type<"pending" | "processing" | "shipped" | "delivered" | "cancelled">()
    .notNull()
    .default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const ordersRelations = relations(ordersTable, ({ one }) => ({
  cart: one(cartsTable, {
    fields: [ordersTable.cartId],
    references: [cartsTable.id],
  }),
  user: one(users, {
    fields: [ordersTable.userId],
    references: [users.id],
  }),
}));
