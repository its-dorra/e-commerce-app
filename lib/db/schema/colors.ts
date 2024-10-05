import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const colors = sqliteTable('colors', {
  color_id: integer('color_id').primaryKey(),
  name: text('name').notNull(),
  hex_code: text('hex_code').notNull(),
});
