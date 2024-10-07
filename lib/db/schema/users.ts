import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  user_id: integer('user_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  full_name: text('full_name'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
