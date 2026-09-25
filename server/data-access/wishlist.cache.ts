import { updateTag } from "next/cache";
import { getUserTag } from "@/lib/data-cache";

export function getWishlistUserTag(userId: string) {
  return getUserTag("wishlist", userId);
}

export function revalidateWishlistCache(userId: string) {
  updateTag(getWishlistUserTag(userId));
}
