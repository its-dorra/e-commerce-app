import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { cartTable } from "./carts";
import { userTable } from "./users";
import { relations } from "drizzle-orm";

export const orderTable = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  cartId: integer("cart_id", { mode: "number" })
    .notNull()
    .references(() => cartTable.id),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  totalPrice: real("total_price").notNull(),
  phone_number: text("phone_number"),
  wilaya: text("wilaya"),
  city: text("city"),

  streetAddress: text("street_address"),
  status: text("status", {
    enum: ["pending", "processing", "delivered", "cancelled"],
  })
    .$type<"pending" | "processing" | "delivered" | "cancelled">()
    .notNull()
    .default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const orderRelations = relations(orderTable, ({ one }) => ({
  cart: one(cartTable, {
    fields: [orderTable.cartId],
    references: [cartTable.id],
  }),
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
}));
