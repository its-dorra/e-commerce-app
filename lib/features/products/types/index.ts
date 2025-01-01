import { getCategories, getColors, getProducts, getSizes } from "../services";

export type ICategories = Awaited<ReturnType<typeof getCategories>>;
export type ISizes = Awaited<ReturnType<typeof getSizes>>;
export type IColors = Awaited<ReturnType<typeof getColors>>;
export type IProducts = Awaited<ReturnType<typeof getProducts>>;
