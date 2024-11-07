import api from "@/lib/api";
import { InferResponseType } from "hono";

const categoriesRes = api.shop.categories.$get;
const sizesRes = api.shop.sizes.$get;
const colorsRes = api.shop.colors.$get;
const getProductsRes = api.shop.products.$get;

export type ICategories = InferResponseType<typeof categoriesRes>;
export type ISizes = InferResponseType<typeof sizesRes>;
export type IColors = InferResponseType<typeof colorsRes>;
export type IProducts = InferResponseType<typeof getProductsRes>;
