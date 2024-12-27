import {
  sqliteTable,
  integer,
  text,
  real,
  index,
} from "drizzle-orm/sqlite-core";
import { usersTable as users } from "./users";
import { productVariantsTable } from "./productVariants";
import { relations } from "drizzle-orm";

export const cartsTable = sqliteTable("carts", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  isMigratedToCheckout: integer("is_migrated_to_checkout", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const cartItemsTable = sqliteTable(
  "cart_items",
  {
    id: integer("cart_item_id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    productVariantId: integer("product_variant_id")
      .notNull()
      .references(() => productVariantsTable.id),
    quantity: integer("quantity").notNull().default(1),
    itemPrice: real("item_price").notNull(),
    cartId: integer("cart_id")
      .notNull()
      .references(() => cartsTable.id),
    createdAt: integer("created_at", { mode: "timestamp" }).$default(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$default(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    productIdIdx: index("product_id_idx").on(table.productVariantId),
  }),
);

export const cartsRelations = relations(cartsTable, ({ one, many }) => ({
  cartItems: many(cartItemsTable),
  user: one(users, {
    fields: [cartsTable.userId],
    references: [users.id],
  }),
}));

export const cartItemsRelations = relations(cartItemsTable, ({ one }) => ({
  productVariant: one(productVariantsTable, {
    fields: [cartItemsTable.productVariantId],
    references: [productVariantsTable.id],
  }),
  cart: one(cartsTable, {
    fields: [cartItemsTable.cartId],
    references: [cartsTable.id],
  }),
}));
