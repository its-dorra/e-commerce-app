import { updateTag } from "next/cache";
import { getUserTag } from "@/lib/data-cache";

export function getAddressUserTag(userId: string) {
  return getUserTag("address", userId);
}

export function revalidateAddressCache(userId: string) {
  updateTag(getAddressUserTag(userId));
}
