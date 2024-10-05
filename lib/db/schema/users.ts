import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  user_id: integer('user_id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  full_name: text('full_name'),
});
