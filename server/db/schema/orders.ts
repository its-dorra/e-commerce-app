import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { cartsTable } from "./carts";
import { usersTable as users } from "./users";

export const ordersTable = sqliteTable("orders", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  cart_id: integer("cart_id", { mode: "number" })
    .notNull()
    .references(() => cartsTable.id),
  user_id: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
  phone_number: text("phone_number"),
  wilaya: text("wilaya"),
  city: text("city"),
  street_address: text("street_address"),
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
