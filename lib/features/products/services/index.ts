import api from "@/lib/api";
import { configCacheForFetch, getGlobalTag, getIdTag } from "@/lib/cache";

export const getCategories = async () => {
  const res = await api.shop.categories.$get(undefined, {
    fetch(input, requestInit, Env, executionCtx) {
      return fetch(
        input,
        configCacheForFetch(requestInit, [getGlobalTag("productsCategories")]),
      );
    },
  });
  if (!res.ok) throw new Error("Can't get categories");
  const { categories } = await res.json();

  return categories;
};

export const getColors = async () => {
  const res = await api.shop.colors.$get(undefined, {
    fetch(input, requestInit, Env, executionCtx) {
      return fetch(
        input,
        configCacheForFetch(requestInit, [getGlobalTag("productsColors")]),
      );
    },
  });
  if (!res.ok) throw new Error("Can't get colors");
  const { colors } = await res.json();

  return colors;
};

export const getSizes = async () => {
  const res = await api.shop.sizes.$get(undefined, {
    fetch(input, requestInit, Env, executionCtx) {
      return fetch(
        input,
        configCacheForFetch(requestInit, [getGlobalTag("productsSizes")]),
      );
    },
  });
  if (!res.ok) throw new Error("Can't get sizes");
  const { sizes } = await res.json();

  return sizes;
};

export const getProducts = async ({
  categories,
  colors,
  sizes,
  page,
}: {
  categories: string | string[] | undefined;
  colors: string | string[] | undefined;
  sizes: string | string[] | undefined;
  page: string | string[] | undefined;
}) => {
  const res = await api.shop.products.$get(
    {
      query: { page, categories, sizes, colors },
    },
    {
      fetch(input, requestInit, Env, executionCtx) {
        return fetch(
          input,
          configCacheForFetch(requestInit, [getGlobalTag("products")]),
        );
      },
    },
  );

  if (!res.ok) throw new Error("Can't get products");

  const data = await res.json();

  return data;
};

export const getProductById = async (id: string) => {
  const res = await api.shop.products[":id"].$get(
    { param: { id } },
    {
      fetch(input, requestInit, Env, executionCtx) {
        return fetch(
          input,
          configCacheForFetch(requestInit, [getIdTag("product", id)]),
        );
      },
    },
  );

  if (!res.ok) throw new Error("Can't get product");

  const { product } = await res.json();

  return product;
};
