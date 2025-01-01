import LoadingSpinner from "@/lib/components/LoadingSpinner";
import PaginationComponent from "@/lib/components/PaginationComponent";
import CategoriesFilter from "@/lib/features/products/components/CategoriesFilter";
import ColorsFilter from "@/lib/features/products/components/ColorsFilter";
import FilterButton from "@/lib/features/products/components/FilterButton";
import FilteringProducts from "@/lib/features/products/components/FilteringProducts";
import ProductsContainer from "@/lib/features/products/components/ProductsContainer";
import SizesFilter from "@/lib/features/products/components/SizesFilter";
import {
  getProducts,
  getCategories,
  getColors,
  getSizes,
} from "@/lib/features/products/services";
import { Suspense } from "react";
import { baseUrl } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata = {
  title: "Fashion Haven | Explore Our Products",
  description:
    "Discover the latest trends in fashion at Fashion Haven. Browse our collection of stylish and comfortable clothing for every occasion.",
  openGraph: {
    title: "Fashion Haven | Explore Our Products",
    description:
      "Browse the Fashion Haven collection to find trendy and high-quality clothing for every style. Shop now and elevate your wardrobe.",
    url: `${baseUrl}/products`,
    siteName: "Fashion Haven",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fashion Haven | Explore Our Products",
    description:
      "Browse the Fashion Haven collection to find trendy and high-quality clothing for every style. Shop now and elevate your wardrobe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface ProductsProps {
  searchParams: Promise<{
    categories: string | string[] | undefined;
    colors: string | string[] | undefined;
    sizes: string | string[] | undefined;
    page: string | undefined;
  }>;
}

async function Products({
  searchParams,
}: {
  searchParams: Awaited<ProductsProps["searchParams"]>;
}) {
  const {
    products,
    pagination: { totalPages, page, total, perPage },
  } = await getProducts({
    ...searchParams,
    page: searchParams.page ? +searchParams.page : undefined,
  });

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
        <>
          <ProductsContainer products={products} />
          <PaginationComponent count={total} perPage={perPage} />
        </>
      ) : (
        <div>No products for this filter</div>
      )}
    </div>
  );
}

export default async function ProductsListing(props: ProductsProps) {
  const searchParams = await props.searchParams;
  const [sizes, categories, colors] = await Promise.all([
    getSizes(),
    getCategories(),
    getColors(),
  ]);

  return (
    <main className="grid w-full grid-cols-1 lg:grid-cols-[250px_1fr]">
      <FilteringProducts>
        <CategoriesFilter data={categories} />
        <ColorsFilter data={colors} />
        <SizesFilter data={sizes} />
      </FilteringProducts>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<LoadingSpinner size="xl" />}
      >
        <Products searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
