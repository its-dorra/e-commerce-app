import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sizes = sqliteTable('sizes', {
  size_id: integer('size_id').primaryKey(),
  name: text('name').notNull(),
});
