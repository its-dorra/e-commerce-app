import api from "@/lib/api";
import { configCacheForFetch, getUserTag } from "@/lib/cache";

export const getCart = async (userId: string) => {
  const res = await api.cart.$get(undefined, {
    fetch(input, requestInit, Env, executionCtx) {
      return fetch(
        input,
        configCacheForFetch(requestInit, [getUserTag("cart", userId)]),
      );
    },
  });

  if (!res.ok) throw new Error("Can't get cart");

  const { cart } = await res.json();

  return cart;
};

export const addItemToCart = async ({
  productVariantId,
  quantity,
  userId,
}: {
  productVariantId: number;
  quantity: number;
  userId: string;
}) => {
  const res = await api.cart.$post(
    { json: { productVariantId, quantity } },
    {
      fetch(input, requestInit, Env, executionCtx) {
        return fetch(
          input,
          configCacheForFetch(requestInit, [getUserTag("cart", userId)]),
        );
      },
    },
  );

  if (!res.ok) throw new Error("Can't add item to cart");

  const data = await res.json();

  return data;
};

export const updateCartItemQuantity = async ({
  productVariantId,
  quantity,
  userId,
}: {
  productVariantId: number;
  quantity: number;
  userId: string;
}) => {
  const res = await api.cart[":id"].$patch(
    {
      param: { id: `${productVariantId}` },
      json: { quantity },
    },
    {
      fetch(input, requestInit, Env, executionCtx) {
        return fetch(
          input,
          configCacheForFetch(requestInit, [getUserTag("cart", userId)]),
        );
      },
    },
  );

  if (!res.ok) throw new Error("Can't update cart item quantity");

  return res.json();
};

export const deleteCartItem = async ({
  cartItemId,
  userId,
}: {
  cartItemId: number;
  userId: string;
}) => {
  const res = await api.cart[":id"].$delete(
    { param: { id: `${cartItemId}` } },
    {
      fetch(input, requestInit, Env, executionCtx) {
        return fetch(
          input,
          configCacheForFetch(requestInit, [getUserTag("cart", userId)]),
        );
      },
    },
  );

  if (!res.ok) throw new Error("Can't delete cart item");

  return res.json();
};
