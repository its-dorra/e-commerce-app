import { updateTag } from "next/cache";
import { getUserTag } from "@/lib/data-cache";

export function getUserProfileTag(userId: string) {
  return getUserTag("users", userId);
}

export function revalidateUserCache(userId: string) {
  updateTag(getUserProfileTag(userId));
}
