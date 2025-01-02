import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { userTable } from "./users";
import { productTable } from "./products";
import { relations } from "drizzle-orm";

export const wishListTable = sqliteTable(
  "wishlist",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
  },
  ({ productId, userId }) => ({
    pk: primaryKey({ columns: [userId, productId] }),
  }),
);

export const wishListRelations = relations(wishListTable, ({ one }) => ({
  user: one(userTable, {
    fields: [wishListTable.userId],
    references: [userTable.id],
  }),
  product: one(productTable, {
    fields: [wishListTable.productId],
    references: [productTable.id],
  }),
}));
