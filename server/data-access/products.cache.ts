import { updateTag } from "next/cache";
import { getGlobalTag, getIdTag } from "@/lib/data-cache";

export function getCategoriesGlobalTag() {
  return getGlobalTag("categories");
}

export function getColorsGlobalTag() {
  return getGlobalTag("colors");
}

export function getProductsGlobalTag() {
  return getGlobalTag("products");
}

export function getProductIdTag(productId: string) {
  return getIdTag("products", productId);
}

export function revalidateCategoriesCache() {
  updateTag(getCategoriesGlobalTag());
}

export function revalidateColorsCache() {
  updateTag(getColorsGlobalTag());
}

export function revalidateProductByIdCache(productId: string) {
  updateTag(getProductIdTag(productId));
}

export function revalidateProductsCache({ id }: { id?: string } = {}) {
  updateTag(getProductsGlobalTag());
  if (id) updateTag(getProductIdTag(id));
}
