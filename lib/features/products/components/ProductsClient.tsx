"use client";

import LoadingSpinner from "@/lib/components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";
import FilterButton from "./FilterButton";
import ProductsContainer from "./ProductsContainer";
import PaginationComponent from "@/lib/components/PaginationComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProductsClient() {
  const { data, isPending, isError, error, refetch } = useProducts();
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name-asc"
  >("featured");

  if (isPending) return <LoadingSpinner size="xl" />;

  if (isError)
    return (
      <div className="section-muted flex min-h-[18rem] w-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-zinc-600">
          Something went wrong: {error.message}
        </p>
        <Button variant="primary" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );

  const {
    products,
    pagination: { page, perPage, total, totalPages },
  } = data;

  const sortedProducts = useMemo(() => {
    const cloned = [...products];

    switch (sortBy) {
      case "price-asc":
        return cloned.sort((a, b) => a.basePrice - b.basePrice);
      case "price-desc":
        return cloned.sort((a, b) => b.basePrice - a.basePrice);
      case "name-asc":
        return cloned.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return cloned;
    }
  }, [products, sortBy]);

  if (sortedProducts.length === 0)
    return (
      <div className="section-muted flex min-h-[22rem] w-full items-center justify-center p-6 text-sm text-zinc-600">
        There are no products matching these filters.
      </div>
    );

  const from = (page - 1) * perPage + 1;
  const to = totalPages > page ? page * perPage : total;

  return (
    <div className="section-muted space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-600">
          Showing {from}-{to} of {total} results
        </p>
        <div className="flex w-full items-center gap-3 md:w-auto md:justify-end">
          <FilterButton />
          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(
                value as "featured" | "price-asc" | "price-desc" | "name-asc",
              )
            }
          >
            <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 bg-zinc-50 md:w-[190px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-zinc-200 bg-zinc-50">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductsContainer products={sortedProducts} />
      <PaginationComponent count={total} perPage={perPage} />
    </div>
  );
}
