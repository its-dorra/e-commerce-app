import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { categories } from './categories';

export const products = sqliteTable('products', {
  product_id: integer('product_id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  base_price: text('base_price').notNull(), // SQLite doesn't have a decimal type, so we use text
  category_id: integer('category_id').references(() => categories.category_id),
});
