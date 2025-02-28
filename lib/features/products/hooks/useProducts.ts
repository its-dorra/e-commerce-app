"use client";

import { clientTrpc } from "@/lib/trpc/client";
import { Size } from "@/server/types/products";
import { useSearchParams } from "next/navigation";

export const useProducts = () => {
  const searchParams = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const categories =
    searchParams.getAll("categories").length > 0
      ? searchParams.getAll("categories")
      : undefined;
  const colors =
    searchParams.getAll("colors").length > 0
      ? searchParams.getAll("colors")
      : undefined;
  const sizes =
    searchParams.getAll("sizes").length > 0
      ? (searchParams.getAll("sizes") as Size[])
      : undefined;

  const utils = clientTrpc.useUtils();

  if (currentPage > 1) {
    utils.products.products.prefetch({
      page: currentPage - 1,
      perPage: 8,
      categories,
      colors,
      sizes,
    });
  }

  utils.products.products.prefetch({
    page: currentPage + 1,
    perPage: 8,
    categories,
    colors,
    sizes,
  });

  return clientTrpc.products.products.useQuery({
    page: currentPage,
    perPage: 8,
    categories,
    colors,
    sizes,
  });
};
