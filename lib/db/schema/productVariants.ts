import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { products } from './products';
import { colors } from './colors';
import { sizes } from './sizes';
import { sql } from 'drizzle-orm';

export const productVariants = sqliteTable('product_variants', {
  variant_id: integer('variant_id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  product_id: integer('product_id', { mode: 'number' })
    .notNull()
    .references(() => products.product_id),
  color_id: integer('color_id', { mode: 'number' })
    .notNull()
    .references(() => colors.color_id),
  size_id: integer('size_id', { mode: 'number' })
    .notNull()
    .references(() => sizes.size_id),
  quantity: integer('quantity', { mode: 'number' }).notNull().default(0),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
