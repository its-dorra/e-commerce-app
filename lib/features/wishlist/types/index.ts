import { useWishlist } from "../hooks/useWishlist";

export type WishlistItem = Exclude<
  ReturnType<typeof useWishlist>["data"],
  undefined
>[number];
