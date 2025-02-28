import { catchError } from "@/lib/utils";
import db from "../db";
import { checkInventoryAvailibilty, getProductVarientById } from "./products";
import { cartItemTable, cartTable } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { Transaction } from "@/server/types/db";

export const handleCartItem = ({
  cartId,
  quantity,
  productVariant,
}: {
  cartId: number;
  productVariant: Exclude<
    Awaited<ReturnType<typeof getProductVarientById>>,
    undefined
  >;
  quantity: number;
}) => {
  return db.transaction(async (tx) => {
    const existingItem = await tx.query.cartItemTable.findFirst({
      where: and(
        eq(cartItemTable.cartId, cartId),
        eq(cartItemTable.sizeId, productVariant.id),
      ),
    });

    if (existingItem) {
      const [updatedItem] = await tx
        .update(cartItemTable)
        .set({ quantity })
        .where(eq(cartItemTable.id, existingItem.id))
        .returning();
      return updatedItem;
    }

    // Calculate final item price including adjustments
    const finalPrice =
      productVariant.variant.product.basePrice +
      (productVariant.priceAdjustment || 0);

    const [newItem] = await tx
      .insert(cartItemTable)
      .values({
        cartId,
        sizeId: productVariant.id,
        quantity,
        itemPrice: finalPrice,
      })
      .returning();

    return newItem;
  });
};

export const getCartItems = (userId: string) => {
  return db.query.cartTable.findFirst({
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    where: ({ userId: tableUserId }, { eq }) => eq(tableUserId, userId),
    with: {
      cartItems: {
        with: {
          size: {
            with: {
              variant: {
                with: {
                  color: true,
                  images: {
                    columns: {
                      imagePath: true,
                    },
                    limit: 1,

                    orderBy: ({ displayOrder }, { asc }) => asc(displayOrder),
                  },
                  product: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const getCart = (userId: string) => {
  return db.transaction(async (tx) => {
    const existingCart = await tx.query.cartTable.findFirst({
      where: ({ userId: tableUserId }, { eq }) => eq(tableUserId, userId),
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    });

    if (existingCart) return existingCart;

    const [newCart] = await tx.insert(cartTable).values({ userId }).returning();

    return newCart;
  });
};

export const addItemToCart = async ({
  productVariantId,
  quantity,
  userId,
}: {
  productVariantId: number;
  userId: string;
  quantity: number;
}) => {
  const [productVariant, errorGettingProductVariant] = await catchError(
    getProductVarientById(productVariantId),
  );
  if (errorGettingProductVariant)
    throw new TRPCError({
      message: "Failed to fetch product details",
      code: "INTERNAL_SERVER_ERROR",
    });
  if (!productVariant)
    throw new TRPCError({
      message: "Product variant not found",
      code: "NOT_FOUND",
    });

  const [userCart, errorHandlingCart] = await catchError(getCart(userId));

  if (errorHandlingCart)
    throw new TRPCError({
      message: "Failed to process cart",
      code: "INTERNAL_SERVER_ERROR",
    });

  const [cartItem, errorHandlingCartItem] = await catchError(
    handleCartItem({ cartId: userCart.id, productVariant, quantity }),
  );

  if (errorHandlingCartItem)
    throw new TRPCError({
      message: "Failed to process cart",
      code: "INTERNAL_SERVER_ERROR",
    });

  return cartItem;
};

export const deleteCartItem = async ({
  cartItemId,
  userId,
}: {
  cartItemId: number;
  userId: string;
}) => {
  const userCart = await getCart(userId);

  return db
    .delete(cartItemTable)
    .where(
      and(
        eq(cartItemTable.id, cartItemId),
        eq(cartItemTable.cartId, userCart.id),
      ),
    )
    .returning();
};

export const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
  userId,
}: {
  cartItemId: number;
  quantity: number;
  userId: string;
}) => {
  if (quantity <= 0) return deleteCartItem({ cartItemId, userId });

  const userCart = await getCart(userId);

  return db
    .update(cartItemTable)
    .set({ quantity })
    .where(
      and(
        eq(cartItemTable.id, cartItemId),
        eq(cartItemTable.cartId, userCart.id),
      ),
    )
    .returning();
};

export const deleteCart = async ({
  cartId,
  tx,
}: {
  tx: Transaction;
  cartId: number;
}) => {
  return tx.delete(cartTable).where(eq(cartTable.id, cartId));
};

export const deleteCartItems = async ({
  cartItemsIds,
  tx,
}: {
  cartItemsIds: number[];
  tx: Transaction;
}) => {
  return tx
    .delete(cartItemTable)
    .where(inArray(cartItemTable.id, cartItemsIds));
};
