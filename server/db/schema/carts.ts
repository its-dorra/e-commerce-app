import {
  sqliteTable,
  integer,
  text,
  real,
  index,
} from "drizzle-orm/sqlite-core";
import { userTable } from "./users";
import { relations } from "drizzle-orm";
import { sizeTable } from "./productVariants";

export const cartTable = sqliteTable("cart", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const cartItemTable = sqliteTable(
  "cart_items",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    sizeId: integer("size_id")
      .notNull()
      .references(() => sizeTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    itemPrice: real("item_price").notNull(),
    cartId: integer("cart_id")
      .notNull()
      .references(() => cartTable.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    productIdIdx: index("cart_product_id_idx").on(table.sizeId),
  }),
);

export const cartRelations = relations(cartTable, ({ one, many }) => ({
  cartItems: many(cartItemTable),
  user: one(userTable, {
    fields: [cartTable.userId],
    references: [userTable.id],
  }),
}));

export const cartItemRelations = relations(cartItemTable, ({ one }) => ({
  size: one(sizeTable, {
    fields: [cartItemTable.sizeId],
    references: [sizeTable.id],
  }),
  cart: one(cartTable, {
    fields: [cartItemTable.cartId],
    references: [cartTable.id],
  }),
}));
