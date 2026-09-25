"use client";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../services";

type ProductsData = Awaited<ReturnType<typeof getProducts>>;

export default function ProductsClient({
  productsData,
}: {
  productsData: ProductsData;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "featured";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (value === "featured") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", value);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const products = productsData.products;

  if (products.length === 0)
    return (
      <div className="section-muted flex min-h-[22rem] w-full items-center justify-center p-6 text-sm text-zinc-600">
        There are no products matching these filters.
      </div>
    );

  const {
    pagination: { page, perPage, total, totalPages },
  } = productsData;

  const from = (page - 1) * perPage + 1;
  const to = totalPages > page ? page * perPage : total;

  return (
    <div className="space-y-6">
      <div className="flex animate-fade-in flex-col gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4 md:flex-row md:items-center md:justify-between">
        <p className="font-body text-xs font-medium tracking-wide text-stone-600">
          Showing{" "}
          <span className="font-semibold text-stone-900">
            {from}–{to}
          </span>{" "}
          of <span className="font-semibold text-stone-900">{total}</span> items
        </p>
        <div className="flex w-full items-center gap-3 md:w-auto md:justify-end">
          <FilterButton />
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-10 w-full rounded-lg border-stone-200 bg-white font-body text-xs md:w-[190px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-stone-200/90 bg-white font-body text-xs shadow-lg">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductsContainer products={products} />
      <PaginationComponent count={total} perPage={perPage} />
    </div>
  );
}
