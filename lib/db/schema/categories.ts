import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  category_id: integer('category_id').primaryKey(),
  name: text('name').notNull(),
});
