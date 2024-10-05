import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { carts } from './carts';
import { users } from './users';

export const orders = sqliteTable('orders', {
  order_id: integer('order_id').primaryKey(),
  cart_id: integer('cart_id')
    .notNull()
    .references(() => carts.cart_id),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.user_id),
  phone_number: text('phone_number'),
  wilaya: text('wilaya'),
  city: text('city'),
  street_address: text('street_address'),
});
