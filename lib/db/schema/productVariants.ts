import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { products } from './products';
import { colors } from './colors';
import { sizes } from './sizes';

export const productVariants = sqliteTable('product_variants', {
  variant_id: integer('variant_id').primaryKey(),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  color_id: integer('color_id')
    .notNull()
    .references(() => colors.color_id),
  size_id: integer('size_id')
    .notNull()
    .references(() => sizes.size_id),
  quantity: integer('quantity').notNull().default(0),
});
