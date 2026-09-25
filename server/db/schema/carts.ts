import {
  pgTable,
  uuid,
  integer,
  text,
  doublePrecision,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { userTable } from "./users";
import { sizeTable } from "./productVariants";

export const cartTable = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const cartItemTable = pgTable(
  "cart_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sizeId: uuid("size_id")
      .notNull()
      .references(() => sizeTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    itemPrice: doublePrecision("item_price").notNull(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => cartTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("cart_product_id_idx").on(table.sizeId)],
);
