import api from "@/lib/api";

export const getCart = async () => {
  const res = await api.cart.$get();

  if (!res.ok) throw new Error("Can't get cart");

  const { cart } = await res.json();

  return cart;
};

export const addItemToCart = async ({
  productVariantId,
  quantity,
}: {
  productVariantId: number;
  quantity: number;
}) => {
  const res = await api.cart.$post({ json: { productVariantId, quantity } });

  if (!res.ok) throw new Error("Can't add item to cart");

  const data = await res.json();

  return data;
};

export const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) => {
  const res = await api.cart[":id"].$patch({
    param: { id: `${cartItemId}` },
    json: { quantity },
  });

  if (!res.ok) throw new Error("Can't update cart item quantity");

  return res.json();
};

export const deleteCartItem = async ({
  cartItemId,
}: {
  cartItemId: number;
}) => {
  const res = await api.cart[":id"].$delete({ param: { id: `${cartItemId}` } });

  if (!res.ok) throw new Error("Can't delete cart item");

  return res.json();
};
