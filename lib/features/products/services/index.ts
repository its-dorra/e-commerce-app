import api from "@/lib/api";

export const getCategories = async () => {
  const res = await api.shop.categories.$get();
  if (!res.ok) throw new Error("Can't get categories");
  const { categories } = await res.json();

  return categories;
};

export const getProducts = async ({
  categories,
  colors,
  sizes,
  page,
}: {
  categories: string | undefined;
  colors: string | undefined;
  sizes: string | undefined;
  page: string | undefined;
}) => {
  const res = await api.shop.products.$get({
    query: { page, categories, sizes, colors },
  });

  if (!res.ok) throw new Error("Can't get products");

  const data = await res.json();

  return data;
};
