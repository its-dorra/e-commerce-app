import { updateTag } from "next/cache";
import { getGlobalTag, getIdTag, getUserTag } from "@/lib/data-cache";
import { getProductIdTag, getProductsGlobalTag } from "./products.cache";

export function getOrdersGlobalTag() {
  return getGlobalTag("orders");
}

export function getOrderUserTag(userId: string) {
  return getUserTag("orders", userId);
}

export function getOrderIdTag(orderId: string) {
  return getIdTag("orders", orderId);
}

export function revalidateOrdersCache({
  id,
  userId,
  productIds,
}: {
  id?: string;
  userId?: string;
  productIds?: string[];
} = {}) {
  updateTag(getOrdersGlobalTag());
  if (userId) updateTag(getOrderUserTag(userId));
  if (id) updateTag(getOrderIdTag(id));
  if (productIds && productIds.length > 0) {
    updateTag(getProductsGlobalTag());
    for (const productId of productIds) {
      updateTag(getProductIdTag(productId));
    }
  }
}
