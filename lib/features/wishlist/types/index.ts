import { getAllwishlistItems } from "@/server/data-access/wishlist";

export type WishlistItem = Awaited<
  ReturnType<typeof getAllwishlistItems>
>[number];
