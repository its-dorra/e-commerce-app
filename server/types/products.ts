export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";

export type SortBy = "featured" | "price-asc" | "price-desc" | "name-asc";

export type FilterQuery = {
  categories?: string[];
  colors?: string[];
  sizes?: Size[];
  sortBy?: SortBy;
};
