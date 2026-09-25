import { catchError } from "@/lib/utils";
import db from "../db";
import { getProductVarientById } from "./products";
import { cartItemTable, cartTable } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { Transaction } from "@/server/types/db";
import { cacheTag } from "next/cache";
import { getCartUserTag, revalidateCartCache } from "./cart.cache";

export const handleCartItem = ({
  cartId,
  quantity,
  productVariant,
}: {
  cartId: string;
  productVariant: Exclude<
    Awaited<ReturnType<typeof getProductVarientById>>,
    undefined
  >;
  quantity: number;
}) => {
  return db.transaction(async (tx) => {
    const existingItem = await tx.query.cartItemTable.findFirst({
      where: {
        cartId,
        sizeId: productVariant.id,
      },
    });

    if (existingItem) {
      const [updatedItem] = await tx
        .update(cartItemTable)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItemTable.id, existingItem.id))
        .returning();
      return updatedItem;
    }

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

export const getCartItems = async (userId: string) => {
  "use cache";
  cacheTag(getCartUserTag(userId));

  return db.query.cartTable.findFirst({
    orderBy: { createdAt: "desc" },
    where: { userId },
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

                    orderBy: { displayOrder: "asc" },
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
      where: { userId },
      orderBy: { createdAt: "desc" },
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
  productVariantId: string;
  userId: string;
  quantity: number;
}) => {
  const [productVariant, errorGettingProductVariant] = await catchError(
    getProductVarientById(productVariantId),
  );
  if (errorGettingProductVariant) {
    throw new Error("Failed to fetch product details");
  }
  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  const [userCart, errorHandlingCart] = await catchError(getCart(userId));

  if (errorHandlingCart) {
    throw new Error("Failed to process cart");
  }

  const [cartItem, errorHandlingCartItem] = await catchError(
    handleCartItem({ cartId: userCart.id, productVariant, quantity }),
  );

  if (errorHandlingCartItem) {
    throw new Error("Failed to process cart");
  }

  revalidateCartCache(userId);
  return cartItem;
};

export const deleteCartItem = async ({
  cartItemId,
  userId,
}: {
  cartItemId: string;
  userId: string;
}) => {
  const userCart = await getCart(userId);

  const deleted = await db
    .delete(cartItemTable)
    .where(
      and(
        eq(cartItemTable.id, cartItemId),
        eq(cartItemTable.cartId, userCart.id),
      ),
    )
    .returning();

  revalidateCartCache(userId);
  return deleted;
};

export const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
  userId,
}: {
  cartItemId: string;
  quantity: number;
  userId: string;
}) => {
  if (quantity <= 0) return deleteCartItem({ cartItemId, userId });

  const userCart = await getCart(userId);

  const updated = await db
    .update(cartItemTable)
    .set({ quantity })
    .where(
      and(
        eq(cartItemTable.id, cartItemId),
        eq(cartItemTable.cartId, userCart.id),
      ),
    )
    .returning();

  revalidateCartCache(userId);
  return updated;
};

export const deleteCart = async ({
  cartId,
  tx,
}: {
  tx: Transaction;
  cartId: string;
}) => {
  return tx.delete(cartTable).where(eq(cartTable.id, cartId));
};

export const deleteCartItems = async ({
  cartItemsIds,
  tx,
}: {
  cartItemsIds: string[];
  tx: Transaction;
}) => {
  return tx
    .delete(cartItemTable)
    .where(inArray(cartItemTable.id, cartItemsIds));
};
