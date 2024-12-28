import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { productsTable } from "./products";
import { relations } from "drizzle-orm";

export const wishListTable = sqliteTable(
  "wishlist",
  {
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }),
  },
  ({ productId, userId }) => ({
    pk: primaryKey({ columns: [userId, productId] }),
  }),
);

export const wishListRelations = relations(wishListTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [wishListTable.userId],
    references: [usersTable.id],
  }),
  product: one(productsTable, {
    fields: [wishListTable.productId],
    references: [productsTable.id],
  }),
}));
