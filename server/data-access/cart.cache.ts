import { updateTag } from "next/cache";
import { getUserTag } from "@/lib/data-cache";

export function getCartUserTag(userId: string) {
  return getUserTag("carts", userId);
}

export function revalidateCartCache(userId: string) {
  updateTag(getCartUserTag(userId));
}
