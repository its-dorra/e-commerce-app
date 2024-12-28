import api from "@/lib/api";

export const toggleWishlist = async ({ productId }: { productId: number }) => {
  const res = await api.wishlist.$post({ json: { productId } });

  if (!res.ok) throw new Error("Can't toggle wishlist");

  return res.json();
};

export const isInWishlist = async ({ productId }: { productId: number }) => {
  const res = await api.wishlist.check[":productId"].$get({
    param: { productId: `${productId}` },
  });

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};

export const getWishlistItems = async () => {
  const res = await api.wishlist.$get();

  if (!res.ok) throw new Error(res.statusText);

  return res.json();
};
