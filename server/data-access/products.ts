import { PER_PAGE } from "@/lib/constants/app-config";
import db from "@/server/db";
import {
  imageTable,
  productTable,
  productVariantTable,
  sizeTable,
} from "@/server/db/schema";
import { count, eq } from "drizzle-orm";

import { FilterQuery, Size } from "../types/products";
import { Product } from "../db/schema/products";

export const getCategories = () => {
  return db.query.categoryTable.findMany({
    columns: {
      name: true,
    },
  });
};

export const getColors = () => {
  return db.query.colorTable.findMany({
    columns: {
      name: true,
      hexCode: true,
    },
  });
};

export const getSizes = (): Size[] => {
  return ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;
};

export const getProducts = async (
  page: number,
  { categories, colors, sizes }: FilterQuery,
  perPage: number = PER_PAGE,
) => {
  const productsQuery = db.query.productTable.findMany({
    columns: {
      description: false,
      createdAt: false,
      updatedAt: false,
      categoryName: false,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    ...(categories &&
      categories.length > 0 && {
        where: (fields, { inArray }) =>
          inArray(fields.categoryName, categories),
      }),
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      variants: {
        columns: {
          colorName: false,
          createdAt: false,
          id: false,
          productId: false,
          updatedAt: false,
        },
        ...(colors &&
          colors.length > 0 && {
            where: (fields, { inArray }) => inArray(fields.colorName, colors),
          }),
        with: {
          color: {
            columns: {
              name: true,
              hexCode: true,
            },
          },
          images: {
            limit: 1,
            orderBy: (fields, { asc }) => asc(fields.displayOrder),
            columns: {
              imagePath: true,
            },
          },
          sizes: {
            ...(sizes &&
              sizes.length > 0 && {
                where: (fields, { inArray }) => inArray(fields.size, sizes),
              }),
            columns: {
              quantity: true,
            },
          },
        },
      },
    },
  });

  const totalCountQuery = db
    .select({ totalCount: count() })
    .from(productTable)
    .then((res) => res[0]);

  const [products, { totalCount }] = await Promise.all([
    productsQuery,
    totalCountQuery,
  ]);

  const finalProducts = products.map((product) => {
    const totalQuantity = product.variants.reduce(
      (total, variant) =>
        total + variant.sizes.reduce((total, size) => total + size.quantity, 0),
      0,
    );

    return {
      id: product.id,
      name: product.name,
      basePrice: product.basePrice,
      quantity: totalQuantity,
      imageUrl: product.variants[0]?.images[0]?.imagePath || "",
      category: product.category.name,
    };
  });

  return {
    products: finalProducts,
    pagination: {
      total: totalCount,
      page,
      perPage,
      totalPages: Math.ceil(totalCount / PER_PAGE),
    },
  };
};

export const getProductById = async (id: number) => {
  const product = await db.query.productTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    columns: {
      createdAt: false,
      updatedAt: false,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      variants: {
        columns: {
          createdAt: false,
          updatedAt: false,
          productId: false,
        },
        with: {
          sizes: {
            where: (table, { gt }) => gt(table.quantity, 0),
            columns: {
              createdAt: false,
              updatedAt: false,
            },
          },
          color: {
            columns: {
              name: true,
              hexCode: true,
            },
          },
          images: {
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
  product?.variants.forEach((variant) => {
    const productImages = variant.images.map((path) => path.imagePath);
    images.push(...productImages);
    variant.sizes.forEach((size) => {
      totalQuantity += size.quantity;
    });
  });

  return {
    id: product.id,
    name: product.name,
    category: product.category!.name,
    colors: product.variants
      .map((variant) => ({
        colorName: variant.color.name,
        hexCode: variant.color.hexCode,
        variants: variant.sizes.map((size) => ({
          id: size.id,
          size: {
            name: size.size,
          },
          quantity: size.quantity,
        })),
      }))
      .filter((color) => color.variants.length > 0),
    images,
    totalQuantity,
  };
};

export const getProductVarientById = (sizeId: number) => {
  return db.query.sizeTable.findFirst({
    where({ id }, { eq }) {
      return eq(id, sizeId);
    },
    with: {
      variant: {
        with: {
          product: true,
        },
      },
    },
  });
};

export const deleteProductById = (productId: number) => {
  return db
    .delete(productTable)
    .where(eq(productTable.id, productId))
    .returning()
    .then((res) => res?.[0]);
};

export type ProductDetails = Exclude<
  Awaited<ReturnType<typeof getProductById>>,
  undefined
>;

export const addProduct = async (product: Product) => {
  const { variants, ...productData } = product;

  return db.transaction(async (trx) => {
    try {
      const [productResult] = await trx
        .insert(productTable)
        .values(productData)
        .returning();

      const createdVariants = await Promise.all(
        variants.map(async (variant) => {
          const { images, sizes, ...variantData } = variant;
          const [variantResult] = await trx
            .insert(productVariantTable)
            .values({
              ...variantData,
              productId: productResult.id,
            })
            .returning();

          const sizeInserts = sizes.map((size) => {
            return {
              ...size,
              productVariantId: variantResult.id,
            };
          });
          const imageInserts = images.map((image, index) => {
            return {
              imagePath: image,
              displayOrder: index + 1,
              productVariantId: variantResult.id,
            };
          });
          const [createdSizes, createdImages] = await Promise.all([
            trx.insert(sizeTable).values(sizeInserts).returning(),
            trx.insert(imageTable).values(imageInserts).returning(),
          ]);
          return {
            ...variantResult,
            sizes: createdSizes,
            images: createdImages,
          };
        }),
      );
      return { ...productResult, variants: createdVariants };
    } catch (error) {
      console.error("Failed to add product:", error);

      throw new Error(
        error instanceof Error
          ? error.message
          : "An error occurred while adding the product",
      );
    }
  });
};
