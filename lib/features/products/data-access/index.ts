import { PER_PAGE } from "@/lib/constants/app-config";
import db from "@/lib/db";
import {
  categories,
  colors,
  products as productsTable,
  productVariants,
  sizes,
} from "@/lib/db/schema";
import { and, eq, inArray, sql, SQL } from "drizzle-orm";

import { unstable_cache as cache } from "next/cache";
import { FilterQuery } from "../types";

export const getCategories = cache(
  async () => {
    return db.query.categories.findMany({
      columns: {
        name: true,
        id: true,
      },
    });
  },
  ["categories"],
  { tags: ["categories"], revalidate: 60 * 5 },
);

export const getProducts = (page: number, filters: FilterQuery) =>
  cache(
    async () => {
      const productsQuery = db
        .select({
          id: productsTable.id,
          name: productsTable.name,
          description: productsTable.description,
          price: productsTable.basePrice,
          category: categories.name,
          variants: sql<object>`GROUP_CONCAT(
            DISTINCT json_object(
              'id', ${productVariants.id},
              'color', ${colors.name},
              'size', ${sizes.name},
              'quantity', ${productVariants.quantity}
            )
          ) FILTER (WHERE ${productVariants.id} IS NOT NULL)`,
        })
        .from(productsTable)
        .leftJoin(categories, eq(productsTable.categoryId, categories.id))
        .leftJoin(
          productVariants,
          eq(productsTable.id, productVariants.productId),
        )
        .leftJoin(colors, eq(productVariants.colorId, colors.id))
        .leftJoin(sizes, eq(productVariants.sizeId, sizes.id));

      // Build conditions
      const conditions: SQL[] = [];

      if (filters.categories?.length) {
        conditions.push(inArray(categories.name, filters.categories));
      }

      if (filters.colors?.length) {
        conditions.push(inArray(colors.name, filters.colors));
      }

      if (filters.sizes?.length) {
        conditions.push(inArray(sizes.name, filters.sizes));
      }

      // Build final query
      const finalQuery = productsQuery
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .groupBy(productsTable.id)
        .orderBy(productsTable.id)
        .limit(PER_PAGE)
        .offset((page - 1) * PER_PAGE);

      // Get total count for pagination
      const countQuery = db
        .select({
          count: sql<number>`COUNT(DISTINCT ${productsTable.id})`,
        })
        .from(productsTable)
        .leftJoin(categories, eq(productsTable.categoryId, categories.id))
        .leftJoin(
          productVariants,
          eq(productsTable.id, productVariants.productId),
        )
        .leftJoin(colors, eq(productVariants.colorId, colors.id))
        .leftJoin(sizes, eq(productVariants.sizeId, sizes.id))
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      // Execute both queries in parallel
      const [products, [{ count }]] = await Promise.all([
        finalQuery,
        countQuery,
      ]);

      products.forEach((product) => {
        if (product.variants) {
          product.variants = JSON.parse(`[${product.variants}]`);
        } else {
          product.variants = [];
        }
      });

      return {
        products,
        pagination: {
          total: Number(count),
          page,
          perPage: PER_PAGE,
          totalPages: Math.ceil(Number(count) / PER_PAGE),
        },
      };
    },
    [`products-${page}-${PER_PAGE}-${JSON.stringify(filters)}`],
    {
      tags: [
        "products",
        page.toString(),
        ...(filters.categories || []),
        ...(filters.colors || []),
        ...(filters.sizes || []),
      ],
      revalidate: 60 * 5,
    },
  );
