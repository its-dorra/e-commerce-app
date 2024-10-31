import api from "@/lib/api";

export const getCategories = async () => {
  const res = await api.shop.categories.$get();
  if (!res.ok) throw new Error("Can't get categories");
  const { categories } = await res.json();

  return categories;
};

export const getColors = async () => {
  const res = await api.shop.colors.$get();
  if (!res.ok) throw new Error("Can't get colors");
  const { colors } = await res.json();

  return colors;
};

export const getSizes = async () => {
  const res = await api.shop.sizes.$get();
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
  const res = await api.shop.products.$get({
    query: { page, categories, sizes, colors },
  });

  if (!res.ok) throw new Error("Can't get products");

  const data = await res.json();

  return data;
};
