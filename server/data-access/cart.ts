import { catchError } from "@/lib/utils";
import db from "../db";
import { getProductVarientById } from "./products";
import { cartItemsTable, cartsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { ErrorWithStatus } from "../types/types";
import * as HttpStatusCodes from "stoker/http-status-codes";

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
    const existingItem = await tx.query.cartItemsTable.findFirst({
      where: and(
        eq(cartItemsTable.cartId, cartId),
        eq(cartItemsTable.productVariantId, productVariant.id),
      ),
    });

    if (existingItem) {
      const [updatedItem] = await tx
        .update(cartItemsTable)
        .set({ quantity })
        .where(eq(cartItemsTable.id, existingItem.id))
        .returning();
      return updatedItem;
    }

    // Calculate final item price including adjustments
    const finalPrice =
      productVariant.productColor.product.basePrice +
      (productVariant.priceAdjustment || 0);

    const [newItem] = await tx
      .insert(cartItemsTable)
      .values({
        cartId,
        productVariantId: productVariant.id,
        quantity,
        itemPrice: finalPrice,
      })
      .returning();

    return newItem;
  });
};

export const getCartItems = (userId: string) => {
  return db.query.cartsTable.findFirst({
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    where: ({ userId: tableUserId, isMigratedToCheckout }, { eq, and }) =>
      and(eq(tableUserId, userId), eq(isMigratedToCheckout, false)),
    with: {
      cartItems: {
        with: {
          productVariant: {
            with: {
              productColor: {
                with: {
                  image: true,
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
    const existingCart = await tx.query.cartsTable.findFirst({
      where: ({ userId: tableUserId, isMigratedToCheckout }, { eq, and }) =>
        and(eq(tableUserId, userId), eq(isMigratedToCheckout, false)),
      orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    });

    if (existingCart) return existingCart;

    const [newCart] = await tx
      .insert(cartsTable)
      .values({ userId })
      .returning();

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
    throw new ErrorWithStatus(
      "Failed to fetch product details",
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  if (!productVariant)
    throw new ErrorWithStatus(
      "Product variant not found",
      HttpStatusCodes.NOT_FOUND,
    );

  const [userCart, errorHandlingCart] = await catchError(getCart(userId));

  if (errorHandlingCart)
    throw new ErrorWithStatus(
      "Failed to process cart",
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );

  const [cartItem, errorHandlingCartItem] = await catchError(
    handleCartItem({ cartId: userCart.id, productVariant, quantity }),
  );

  if (errorHandlingCartItem)
    throw new ErrorWithStatus(
      "Failed to process cart",
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );

  return cartItem;
};

export const deleteCartItem = (cartItemId: number) => {
  return db
    .delete(cartItemsTable)
    .where(eq(cartItemsTable.id, cartItemId))
    .returning();
};

export const updateCartItemQuantity = ({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) => {
  if (quantity <= 0) return deleteCartItem(cartItemId);

  return db
    .update(cartItemsTable)
    .set({ quantity })
    .where(eq(cartItemsTable.id, cartItemId))
    .returning();
};
