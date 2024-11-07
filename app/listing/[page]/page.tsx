import LoadingSpinner from "@/lib/components/LoadingSpinner";
import FilterButton from "@/lib/features/products/components/FilterButton";
import FilteringProducts from "@/lib/features/products/components/FilteringProducts";
import ProductsContainer from "@/lib/features/products/components/ProductsContainer";
import {
  getProducts,
  getCategories,
  getColors,
  getSizes,
} from "@/lib/features/products/services";
import { Suspense } from "react";

interface ProductsProps {
  searchParams: {
    categories: string | string[] | undefined;
    colors: string | string[] | undefined;
    sizes: string | string[] | undefined;
  };
  params: {
    page: string | string[] | undefined;
  };
}

async function Products({ searchParams, params }: ProductsProps) {
  const {
    products,
    pagination: { totalPages, page, total, perPage },
  } = await getProducts({ ...searchParams, ...params });

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
      {products.length > 0 ? (
        <ProductsContainer products={products} />
      ) : (
        <div>No products for this filter</div>
      )}
    </div>
  );
}

export default async function ProductsListing({
  searchParams,
  params,
}: ProductsProps) {
  const [sizes, categories, colors] = await Promise.all([
    getSizes(),
    getCategories(),
    getColors(),
  ]);

  console.log(params);

  return (
    <main className="grid w-full grid-cols-1 lg:grid-cols-[250px_1fr]">
      <FilteringProducts
        CategoriesFilterData={{ categories }}
        SizesFilterData={{ sizes }}
        ColorsFilterData={{ colors }}
      />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<LoadingSpinner size="xl" />}
      >
        <Products searchParams={searchParams} params={params} />
      </Suspense>
    </main>
  );
}
