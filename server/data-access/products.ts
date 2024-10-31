import { PER_PAGE } from "@/lib/constants/app-config";
import db from "@/server/db";
import {
  categoriesTable,
  colorsTable,
  imagesTable,
  productsTable,
  productVariantsTable,
  sizesTable,
} from "@/server/db/schema";
import { and, eq, exists, inArray, sql, SQL } from "drizzle-orm";

import { FilterQuery } from "../types/products";
import { productColorsTable } from "@/server/db/schema/productVariants";

export const getCategories = async () => {
  return db.query.categoriesTable.findMany({
    columns: {
      name: true,
      id: true,
    },
  });
};

export const getColors = async () => {
  return db.query.colorsTable.findMany({
    columns: {
      id: true,
      name: true,
      hexCode: true,
    },
  });
};

export const getSizes = async () => {
  return db.query.sizesTable.findMany({
    columns: {
      name: true,
      id: true,
    },
  });
};

export const getProducts = async (page: number, filters: FilterQuery) => {
  const productsQuery = db
    .select({
      id: productsTable.id,
      name: productsTable.name,
      price: productsTable.basePrice,
      variants: sql<
        {
          primaryImage: string;
          quantity: number;
        }[]
      >`
      GROUP_CONCAT(
        json_object(
            'primaryImage', (
                SELECT ${imagesTable.imagePath}
                FROM ${imagesTable}
                WHERE ${imagesTable.productColorId} = ${productColorsTable.id}
                LIMIT 1
                ),
                'quantity', ${productVariantsTable.quantity}
                )
                ) AS variants `,
    })
    // AND ${imagesTable.isPrimary} = 1
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .leftJoin(
      productColorsTable,
      eq(productsTable.id, productColorsTable.productId),
    )
    .leftJoin(colorsTable, eq(productColorsTable.colorId, colorsTable.id))
    .leftJoin(
      productVariantsTable,
      eq(productColorsTable.id, productVariantsTable.productColorId),
    );

  const conditions: SQL[] = [];

  if (filters.categories?.length) {
    conditions.push(inArray(categoriesTable.name, filters.categories));
  }

  if (filters.colors?.length) {
    conditions.push(
      exists(
        db
          .select({ one: sql`1` })
          .from(productColorsTable)
          .innerJoin(
            colorsTable,
            eq(colorsTable.id, productColorsTable.colorId),
          )
          .where(
            and(
              eq(productColorsTable.productId, productsTable.id),
              inArray(colorsTable.name, filters.colors),
            ),
          ),
      ),
    );
  }

  if (filters.sizes?.length) {
    conditions.push(
      exists(
        db
          .select({ one: sql`1` })
          .from(productVariantsTable)
          .innerJoin(sizesTable, eq(sizesTable.id, productVariantsTable.sizeId))
          .innerJoin(
            productColorsTable,
            eq(productColorsTable.id, productVariantsTable.productColorId),
          )
          .where(
            and(
              eq(productColorsTable.productId, productsTable.id),
              inArray(sizesTable.name, filters.sizes),
            ),
          ),
      ),
    );
  }

  // Build final query
  const finalQuery = productsQuery
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(productsTable.id)
    .orderBy(productsTable.id)
    .limit(PER_PAGE)
    .offset((page - 1) * PER_PAGE);

  const countQuery = db
    .select({
      count: sql<number>`COUNT(DISTINCT ${productsTable.id})`,
    })
    .from(productsTable)
    .leftJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .leftJoin(
      productColorsTable,
      eq(productsTable.id, productColorsTable.productId),
    )
    .leftJoin(colorsTable, eq(productColorsTable.colorId, colorsTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  const [products, [{ count }]] = await Promise.all([finalQuery, countQuery]);

  const finalProducts = products.map((product) => {
    const variants: typeof product.variants = product.variants
      ? JSON.parse(`[${product.variants}]`)
      : [];

    // Calculate total quantity across all variants
    const totalQuantity = variants.reduce(
      (total, variant) => total + variant.quantity,
      0,
    );

    return {
      id: product.id,
      name: product.name,
      basePrice: product.price,
      quantity: totalQuantity,
      imageUrl: variants[0].primaryImage,
    };
    // return product;
  });

  return {
    products: finalProducts,
    pagination: {
      total: Number(count),
      page,
      perPage: PER_PAGE,
      totalPages: Math.ceil(Number(count) / PER_PAGE),
    },
  };
};
