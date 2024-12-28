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
import { and, eq, exists, gt, inArray, sql, SQL } from "drizzle-orm";

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
    .where(
      and(
        conditions.length > 0 ? and(...conditions) : undefined,
        // gt(productVariantsTable.quantity, 0),
      ),
    )
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
    .leftJoin(
      productVariantsTable,
      eq(productColorsTable.id, productVariantsTable.productColorId),
    )

    .where(
      and(
        conditions.length > 0 ? and(...conditions) : undefined,
        // gt(productVariantsTable.quantity, 0),
      ),
    );
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

export const getProductById = async (id: number) => {
  const product = await db.query.productsTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    columns: {
      createdAt: false,
      updatedAt: false,
      categoryId: false,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      productColor: {
        columns: {
          colorId: false,
          createdAt: false,
          updatedAt: false,
          productId: false,
        },
        with: {
          productVariants: {
            where: (table, { gt }) => gt(table.quantity, 0),
            columns: {
              createdAt: false,
              updatedAt: false,
            },
            with: {
              size: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          color: {
            columns: {
              name: true,
              hexCode: true,
              id: true,
            },
          },
          image: {
            columns: {
              imagePath: true,
            },
          },
        },
      },
    },
  });

  if (!product) return undefined;

  let totalQuantity = 0;
  const images: string[] = [];
  product?.productColor.forEach((color) => {
    const productImages = color.image.map((path) => path.imagePath);
    images.push(...productImages);
    color.productVariants.forEach((variant) => {
      totalQuantity += variant.quantity;
    });
  });

  return {
    id: product.id,
    name: product.name,
    category: product.category!.name,
    colors: product.productColor
      .map((color) => ({
        colorName: color.color.name,
        hexCode: color.color.hexCode,
        variants: color.productVariants.map((variant) => ({
          id: variant.id,
          size: {
            name: variant.size.name,
          },
          quantity: variant.quantity,
        })),
      }))
      .filter((color) => color.variants.length > 0),
    images,
    totalQuantity,
  };
};

export const getProductVarientById = (productVariantId: number) => {
  return db.query.productVariantsTable.findFirst({
    where({ id }, { eq }) {
      return eq(id, productVariantId);
    },
    with: {
      productColor: {
        with: {
          product: true,
        },
      },
    },
  });
};

export type ProductDetails = Exclude<
  Awaited<ReturnType<typeof getProductById>>,
  undefined
>;
