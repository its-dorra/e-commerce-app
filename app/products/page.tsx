import CategoriesFilter from "@/lib/features/products/components/CategoriesFilter";
import ColorsFilter from "@/lib/features/products/components/ColorsFilter";
import FilterButton from "@/lib/features/products/components/FilterButton";
import FilteringProducts from "@/lib/features/products/components/FilteringProducts";
import ProductsContainer from "@/lib/features/products/components/ProductsContainer";
import SizesFilter from "@/lib/features/products/components/SizesFilter";
import { getProducts } from "@/lib/features/products/services";

interface ProductsLisitngProps {
  searchParams: Promise<{
    page: string | string[] | undefined;
    categories: string | string[] | undefined;
    colors: string | string[] | undefined;
    sizes: string | string[] | undefined;
  }>;
}

export default async function ProductsListing(props: ProductsLisitngProps) {
  const searchParams = await props.searchParams;
  const {
    products,
    pagination: { totalPages, page, total },
  } = await getProducts(searchParams);

  return (
    <main className="grid w-full grid-cols-1 lg:grid-cols-[250px_1fr]">
      <FilteringProducts
        SizesFilter={<SizesFilter />}
        CategoriesFilter={<CategoriesFilter />}
        ColorsFilter={<ColorsFilter />}
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between lg:block">
          <p className="body-2">Showing 1-9 of {total} results</p>
          <FilterButton />
        </div>
        {products.length > 0 ? (
          <ProductsContainer products={products} />
        ) : (
          <div>No products for this filter</div>
        )}
      </div>
    </main>
  );
}
