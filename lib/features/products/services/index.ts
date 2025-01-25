import { serverTrpc } from "@/lib/trpc/server";
import { Size } from "@/server/types/products";
import { cache } from "react";

export const getCategories = async () => {
  const res = await serverTrpc.products.categories();

  return res;
};

export const getColors = async () => {
  const res = await serverTrpc.products.colors();

  return res;
};

export const getSizes = async () => {
  const res = await serverTrpc.products.sizes();

  return res;
};

export const getProducts = async (values: {
  categories?: string | string[];
  colors?: string | string[];
  sizes?: Size | Size[];
  page?: number;
  perPage?: number;
}) => {
  const res = await serverTrpc.products.products(values);

  return res;
};

export const getProductById = cache(async (id: number) => {
  const res = await serverTrpc.products.productById({ id });

  return res;
});
