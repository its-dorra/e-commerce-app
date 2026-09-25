import {
  index,
  integer,
  doublePrecision,
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { userTable } from "./users";
import { sizeTable } from "@/server/db/schema/productVariants";

export const orderTable = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    totalPrice: doublePrecision("total_price").notNull(),

    wilaya: text("wilaya").notNull(),
    city: text("city").notNull(),
    streetAddress: text("street_address").notNull(),
    phoneNumber: text("phone_number").notNull(),

    status: text("status")
      .$type<"pending" | "processing" | "delivered" | "canceled">()
      .notNull()
      .default("pending"),

    isSeen: boolean("is_seen").notNull().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("order_user_idx").on(table.userId)],
);

export const orderItemTable = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sizeId: uuid("size_id")
      .notNull()
      .references(() => sizeTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    itemPrice: doublePrecision("item_price").notNull(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("order_product_id_idx").on(table.sizeId),
    index("order_id").on(table.orderId),
  ],
);
