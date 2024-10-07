import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { categories } from './categories';
import { sql } from 'drizzle-orm';

export const products = sqliteTable('products', {
  product_id: integer('product_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  name: text('name').notNull(),
  description: text('description'),
  base_price: text('base_price').notNull(), // SQLite doesn't have a decimal type, so we use text
  category_id: integer('category_id', { mode: 'number' }).references(
    () => categories.category_id
  ),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
