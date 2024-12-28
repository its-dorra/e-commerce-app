import { UserId } from "lucia";
import { revalidateTag } from "next/cache";

export const configCacheForFetch = (
  requestInit: RequestInit | undefined,
  tags: ValidTags[],
) => {
  const config = {
    ...requestInit,
    cache: "force-cache",
    next: {
      ...requestInit?.next,
      tags: ["*", ...tags],
    },
  } satisfies RequestInit;

  return config;
};

export const GLOBAL_CACHE_TAGS = {
  products: "products",
} as const;

export const USER_TAGS = {
  orders: "orders",
} as const;

export const CACHE_TAGS = {
  product: "product",
} as const;

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>;

export function getGlobalTag(tag: keyof typeof GLOBAL_CACHE_TAGS) {
  return `global:${GLOBAL_CACHE_TAGS[tag]}` as const;
}

export function getUserTag(tag: keyof typeof USER_TAGS, userId: UserId) {
  return `user:${userId}-${USER_TAGS[tag]}` as const;
}
export function getIdTag(tag: keyof typeof CACHE_TAGS, id: String) {
  return `id:${id}-${CACHE_TAGS[tag]}` as const;
}

export function cleaFullCache() {
  revalidateTag("*");
}
