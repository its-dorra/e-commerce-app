"use client";

import LoadingSpinner from "@/lib/components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";
import FilterButton from "./FilterButton";
import ProductsContainer from "./ProductsContainer";
import PaginationComponent from "@/lib/components/PaginationComponent";

export default function ProductsClient() {
  const { data, isPending, isError, error, refetch } = useProducts();

  if (isPending) return <LoadingSpinner size="xl" />;

  if (isError)
    return (
      <div>
        <p>Something went wrong: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );

  const {
    products,
    pagination: { page, perPage, total, totalPages },
  } = data;

  if (products.length === 0)
    return (
      <div className="flex w-full items-center justify-center">
        There&apos;s no product to show
      </div>
    );

  const from = (page - 1) * perPage + 1;
  const to = totalPages > page ? page * perPage : total;

  return (
    <div className="space-y-4 lg:px-8">
      <div className="flex items-center justify-between lg:block">
        <p className="body-2">
          Showing {from}-{to} of {total} results
        </p>
        <FilterButton />
      </div>

      <ProductsContainer products={products} />
      <PaginationComponent count={total} perPage={perPage} />
    </div>
  );
}
