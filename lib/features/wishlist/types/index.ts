import { getWishlistItems } from "../services";

export type WishlistItem = Awaited<ReturnType<typeof getWishlistItems>>[number];
