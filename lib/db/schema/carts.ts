import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { productVariants } from './productVariants';

export const carts = sqliteTable('carts', {
  cart_id: integer('cart_id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.user_id),
});

export const cartItems = sqliteTable('cart_items', {
  cart_item_id: integer('cart_item_id').primaryKey(),
  product_variant_id: integer('product_variant_id')
    .notNull()
    .references(() => productVariants.variant_id),
  quantity: integer('quantity').notNull().default(1),
  cart_id: integer('cart_id').notNull(),
});
