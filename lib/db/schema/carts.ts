import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { productVariants } from './productVariants';
import { sql } from 'drizzle-orm';

export const carts = sqliteTable('carts', {
  cart_id: integer('cart_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.user_id),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const cartItems = sqliteTable('cart_items', {
  cart_item_id: integer('cart_item_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  product_variant_id: integer('product_variant_id')
    .notNull()
    .references(() => productVariants.variant_id),
  quantity: integer('quantity').notNull().default(1),
  cart_id: integer('cart_id').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
