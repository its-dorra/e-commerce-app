import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { products } from './products';
import { sql } from 'drizzle-orm';

export const images = sqliteTable('images', {
  image_id: integer('image_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  product_id: integer('product_id', { mode: 'number' })
    .notNull()
    .references(() => products.product_id),
  image_path: text('image_path').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
