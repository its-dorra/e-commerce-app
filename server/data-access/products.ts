import { PER_PAGE } from "@/lib/constants/app-config";
import db from "@/server/db";
import {
  imageTable,
  productTable,
  productVariantTable,
  sizeTable,
} from "@/server/db/schema";
import { and, count, eq, inArray, SQL } from "drizzle-orm";
import { FilterQuery, Size } from "../types/products";
import { Transaction } from "@/server/types/db";
import { cacheTag } from "next/cache";
import {
  getCategoriesGlobalTag,
  getColorsGlobalTag,
  getProductIdTag,
  getProductsGlobalTag,
  revalidateProductsCache,
} from "./products.cache";

export const getCategories = async () => {
  "use cache";
  cacheTag(getCategoriesGlobalTag());

  return db.query.categoryTable.findMany({
    columns: {
      name: true,
    },
  });
};

export const getColors = async () => {
  "use cache";
  cacheTag(getColorsGlobalTag());

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
  page: number = 1,
  { categories, colors, sizes, sortBy }: FilterQuery = {},
  perPage: number = PER_PAGE,
) => {
  "use cache";
  cacheTag(getProductsGlobalTag());

  const hasVariantFilter =
    (colors && colors.length > 0) || (sizes && sizes.length > 0);

  const productsQuery = db.query.productTable.findMany({
    columns: {
      description: false,
      createdAt: false,
      updatedAt: false,
      categoryName: false,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    where: {
      ...(categories &&
        categories.length > 0 && {
          categoryName: { in: categories },
        }),
      ...(hasVariantFilter && {
        variants: {
          ...(colors &&
            colors.length > 0 && {
              colorName: { in: colors },
            }),
          ...(sizes &&
            sizes.length > 0 && {
              sizes: {
                size: { in: sizes },
              },
            }),
        },
      }),
    },
    orderBy:
      sortBy === "price-asc"
        ? { basePrice: "asc" }
        : sortBy === "price-desc"
          ? { basePrice: "desc" }
          : sortBy === "name-asc"
            ? { name: "asc" }
            : { createdAt: "desc" },
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
            where: { colorName: { in: colors } },
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
            orderBy: { displayOrder: "asc" },
            columns: {
              imagePath: true,
            },
          },
          sizes: {
            ...(sizes &&
              sizes.length > 0 && {
                where: { size: { in: sizes } },
              }),
            columns: {
              quantity: true,
            },
          },
        },
      },
    },
  });

  const productConditions: SQL[] = [];
  if (categories && categories.length > 0) {
    productConditions.push(inArray(productTable.categoryName, categories));
  }

  if (hasVariantFilter) {
    const variantConditions: SQL[] = [];
    if (colors && colors.length > 0) {
      variantConditions.push(inArray(productVariantTable.colorName, colors));
    }
    if (sizes && sizes.length > 0) {
      variantConditions.push(inArray(sizeTable.size, sizes));
    }

    const variantQuery =
      sizes && sizes.length > 0
        ? db
            .selectDistinct({ id: productVariantTable.productId })
            .from(productVariantTable)
            .innerJoin(
              sizeTable,
              eq(productVariantTable.id, sizeTable.productVariantId),
            )
            .where(
              variantConditions.length > 0
                ? and(...variantConditions)
                : undefined,
            )
        : db
            .selectDistinct({ id: productVariantTable.productId })
            .from(productVariantTable)
            .where(
              variantConditions.length > 0
                ? and(...variantConditions)
                : undefined,
            );

    productConditions.push(inArray(productTable.id, variantQuery));
  }

  const totalCountQuery = db
    .select({ totalCount: count(productTable.id) })
    .from(productTable)
    .where(productConditions.length > 0 ? and(...productConditions) : undefined)
    .then((res) => res[0]?.totalCount ?? 0);

  const [products, totalCount] = await Promise.all([
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
      totalPages: Math.ceil(totalCount / perPage),
    },
  };
};

export const getProductById = async (id: string) => {
  "use cache";
  cacheTag(getProductIdTag(id));

  const product = await db.query.productTable.findFirst({
    where: { id },
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
            where: { quantity: { gt: 0 } },
            columns: {
              priceAdjustment: true,
              quantity: true,
              id: true,
              size: true,
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
    basePrice: product.basePrice,
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
          priceAdjustment: size.priceAdjustment || 0,
          quantity: size.quantity,
        })),
      }))
      .filter((color) => color.variants.length > 0),
    images,
    totalQuantity,
  };
};

export const getProductVarientById = (sizeId: string) => {
  return db.query.sizeTable.findFirst({
    where: { id: sizeId },
    with: {
      variant: {
        with: {
          product: true,
        },
      },
    },
  });
};

export const deleteProductById = async (productId: string) => {
  const [deleted] = await db
    .delete(productTable)
    .where(eq(productTable.id, productId))
    .returning();

  revalidateProductsCache({ id: productId });
  return deleted;
};

export type ProductDetails = Exclude<
  Awaited<ReturnType<typeof getProductById>>,
  undefined
>;

export const addProduct = async (product: {
  variants: {
    images: string[];
    colorName: string;
    sizes: {
      size: "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
      priceAdjustment: number;
      quantity: number;
      dimensions?: string | undefined;
    }[];
  }[];
  name: string;
  description: string;
  basePrice: number;
  categoryName: string;
}) => {
  const { variants, ...productData } = product;

  const result = await db.transaction(async (trx) => {
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
      throw new Error(
        error instanceof Error
          ? error.message
          : "An error occurred while adding the product",
      );
    }
  });

  revalidateProductsCache();
  return result;
};

export const checkInventoryAvailibilty = async ({
  sizeId,
  quantity,
}: {
  sizeId: string;
  quantity: number;
}) => {
  if (quantity <= 0) throw new Error("Quantity can't be less or equal to 0");
  const size = await db.query.sizeTable.findFirst({
    where: { id: sizeId },
    columns: {
      quantity: true,
    },
  });

  if (!size || size.quantity < quantity)
    throw new Error(
      "There's no product or the quantity is more than what we have",
    );

  return true;
};

export const updateInventoryAfterPurchase = async ({
  sizeId,
  quantity,
  tx,
}: {
  sizeId: string;
  quantity: number;
  tx: Transaction;
}) => {
  const oldSize = await tx.query.sizeTable.findFirst({
    where: { id: sizeId },
    columns: {
      quantity: true,
    },
  });

  if (!oldSize || oldSize.quantity < quantity)
    throw new Error(
      "There's no product or the quantity is more than what we have",
    );

  return tx
    .update(sizeTable)
    .set({ quantity: oldSize.quantity - quantity })
    .where(eq(sizeTable.id, sizeId));
};
