import { and, eq } from "drizzle-orm";
import db from "../db";
import { wishListTable } from "../db/schema";
import { cacheTag } from "next/cache";
import { getWishlistUserTag, revalidateWishlistCache } from "./wishlist.cache";
import { getProductIdTag, revalidateProductByIdCache } from "./products.cache";

export async function isProductInWishList({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  "use cache";
  cacheTag(getWishlistUserTag(userId), getProductIdTag(productId));

  return db.query.wishListTable
    .findFirst({
      where: { productId, userId },
    })
    .then((res) => !!res);
}

export async function toggleProductInWishList({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const result = await db.transaction(async (tx) => {
    const wishList = await tx.query.wishListTable.findFirst({
      where: { productId, userId },
    });

    if (wishList) {
      return tx
        .delete(wishListTable)
        .where(
          and(
            eq(wishListTable.userId, userId),
            eq(wishListTable.productId, productId),
          ),
        )
        .returning()
        .then((res) => res[0]);
    }

    return tx
      .insert(wishListTable)
      .values({ productId, userId })
      .returning()
      .then((res) => res[0]);
  });

  revalidateWishlistCache(userId);
  revalidateProductByIdCache(productId);
  return result;
}

export const getAllwishlistItems = async ({ userId }: { userId: string }) => {
  "use cache";
  cacheTag(getWishlistUserTag(userId));

  return db.query.wishListTable.findMany({
    where: { userId },
    with: {
      product: {
        with: {
          variants: {
            limit: 1,
            columns: {
              id: true,
            },
            with: {
              images: {
                columns: { imagePath: true },
                orderBy: { displayOrder: "asc" },
                limit: 1,
              },
            },
          },
        },
      },
    },
  });
};
