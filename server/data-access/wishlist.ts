import { and, eq } from "drizzle-orm";
import db from "../db";
import { wishListTable } from "../db/schema";

export async function isProductInWishList({
  productId,
  userId,
}: {
  productId: number;
  userId: string;
}) {
  return db.query.wishListTable
    .findFirst({
      where: (fields, { and, eq }) =>
        and(eq(fields.productId, productId), eq(fields.userId, userId)),
    })
    .then((res) => !!res);
}

export async function toggleProductInWishList({
  productId,
  userId,
}: {
  productId: number;
  userId: string;
}) {
  return db.transaction(async (tx) => {
    const wishList = await tx.query.wishListTable.findFirst({
      where: (fields, { and, eq }) =>
        and(eq(fields.productId, productId), eq(fields.userId, userId)),
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
}

export const getAllwishlistItems = ({ userId }: { userId: string }) =>
  db.query.wishListTable.findMany({
    where: (fields, { eq }) => eq(fields.userId, userId),
    with: {
      product: {
        with: {
          productColor: {
            limit: 1,
            columns: {
              id: true,
            },
            with: {
              image: {
                columns: { imagePath: true },
                orderBy: ({ displayOrder }, { asc }) => asc(displayOrder),
                limit: 1,
              },
            },
          },
        },
      },
    },
  });
