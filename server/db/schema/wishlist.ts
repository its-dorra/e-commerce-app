import { primaryKey, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./users";
import { productTable } from "./products";

export const wishListTable = pgTable(
  "wishlist",
  {
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.productId] })],
);
