export type FilterQuery = {
  categories?: string[];
  colors?: string[];
  sizes?: Size[];
};

export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL";
