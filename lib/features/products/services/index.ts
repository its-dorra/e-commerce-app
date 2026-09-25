import {
  getCategories,
  getColors,
  getSizes,
  getProducts as getProductsDataAccess,
  getProductById as getProductByIdDataAccess,
} from "@/server/data-access/products";
import { FilterQuery, Size, SortBy } from "@/server/types/products";

export { getCategories, getColors, getSizes };

export const getProducts = async (
  values: {
    categories?: string | string[];
    colors?: string | string[];
    sizes?: Size | Size[];
    sortBy?: SortBy | string;
    page?: number;
    perPage?: number;
  } = {},
) => {
  return getProductsDataAccess(
    values.page || 1,
    {
      categories:
        typeof values.categories === "string"
          ? [values.categories]
          : values.categories,
      colors:
        typeof values.colors === "string" ? [values.colors] : values.colors,
      sizes:
        typeof values.sizes === "string"
          ? [values.sizes as Size]
          : values.sizes,
      sortBy: values.sortBy as SortBy | undefined,
    },
    values.perPage,
  );
};

export const getProductById = async (id: string) => {
  return getProductByIdDataAccess(id);
};
