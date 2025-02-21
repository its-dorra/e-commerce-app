import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { userTable } from "./users";
import { relations } from "drizzle-orm";
import { sizeTable } from "@/server/db/schema/productVariants";

export const orderTable = sqliteTable(
  "orders",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    totalPrice: real("total_price").notNull(),

    wilaya: text("wilaya").notNull(),

    city: text("city").notNull(),

    streetAddress: text("street_address").notNull(),

    phoneNumber: text("phone_number").notNull(),

    status: text("status", {
      enum: ["pending", "processing", "delivered", "canceled"],
    })
      .$type<"pending" | "processing" | "delivered" | "canceled">()
      .notNull()
      .default("pending"),

    isSeen: integer("is_seen", { mode: "boolean" }).notNull().default(false),

    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdx: index("order_user_idx").on(table.userId),
  }),
);

export const orderItemTable = sqliteTable(
  "order_items",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    sizeId: integer("size_id")
      .notNull()
      .references(() => sizeTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    itemPrice: real("item_price").notNull(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orderTable.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    productIdIdx: index("order_product_id_idx").on(table.sizeId),
    orderIdx: index("order_id").on(table.orderId),
  }),
);

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
  orderItems: many(orderItemTable),
}));

export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderItemTable.orderId],
    references: [orderTable.id],
  }),
  size: one(sizeTable, {
    fields: [orderItemTable.sizeId],
    references: [sizeTable.id],
  }),
}));
