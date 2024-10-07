import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { carts } from './carts';
import { users } from './users';
import { sql } from 'drizzle-orm';

export const orders = sqliteTable('orders', {
  order_id: integer('order_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  cart_id: integer('cart_id', { mode: 'number' })
    .notNull()
    .references(() => carts.cart_id),
  user_id: integer('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.user_id),
  phone_number: text('phone_number'),
  wilaya: text('wilaya'),
  city: text('city'),
  street_address: text('street_address'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
