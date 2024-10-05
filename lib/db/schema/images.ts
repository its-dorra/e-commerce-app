import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const images = sqliteTable('images', {
  image_id: integer('image_id').primaryKey(),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  image_path: text('image_path').notNull(),
});
