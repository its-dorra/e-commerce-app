import CategoriesFilter from "@/lib/features/products/components/CategoriesFilter";
import ColorsFilter from "@/lib/features/products/components/ColorsFilter";
import FilteringProducts from "@/lib/features/products/components/FilteringProducts";
import SizesFilter from "@/lib/features/products/components/SizesFilter";
import {
  getProducts,
  getCategories,
  getColors,
  getSizes,
} from "@/lib/features/products/services";
import env from "@/server/env";
import { Size, SortBy } from "@/server/types/products";
import ProductsClient from "@/lib/features/products/components/ProductsClient";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const prefetch = "partial";

export const metadata = {
  title: "Fashion Haven | Explore Our Products",
  description:
    "Discover the latest trends in fashion at Fashion Haven. Browse our collection of stylish and comfortable clothing for every occasion.",
  openGraph: {
    title: "Fashion Haven | Explore Our Products",
    description:
      "Browse the Fashion Haven collection to find trendy and high-quality clothing for every style. Shop now and elevate your wardrobe.",
    url: `${env.BASE_URL}/products`,
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

function ProductsPageSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden flex-col gap-y-7 self-start rounded-2xl border border-stone-200/70 bg-stone-50/70 p-6 lg:flex">
        <div className="space-y-3">
          <Skeleton className="h-5 w-24 rounded-md" />
          <div className="space-y-2 pt-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-20 rounded-md" />
          <div className="flex flex-wrap gap-2 pt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-7 w-7 rounded-full" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-5 w-16 rounded-md" />
          <div className="flex flex-wrap gap-2 pt-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-8 w-11 rounded-lg" />
            ))}
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 p-4"
            >
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductsListingProps {
  searchParams?: Promise<{
    page?: string;
    categories?: string | string[];
    colors?: string | string[];
    sizes?: string | string[];
    sortBy?: string;
  }>;
}

async function ProductsContent({ searchParams }: ProductsListingProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || 1);
  const categories = resolvedParams?.categories;
  const colors = resolvedParams?.colors;
  const sizes = resolvedParams?.sizes as Size | Size[] | undefined;
  const sortBy = resolvedParams?.sortBy as SortBy | undefined;

  const [sizesList, categoriesList, colorsList, productsData] =
    await Promise.all([
      getSizes(),
      getCategories(),
      getColors(),
      getProducts({
        page,
        categories,
        colors,
        sizes,
        sortBy,
      }),
    ]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <FilteringProducts>
        <CategoriesFilter data={categoriesList} />
        <ColorsFilter data={colorsList} />
        <SizesFilter data={sizesList} />
      </FilteringProducts>

      <ProductsClient productsData={productsData} />
    </div>
  );
}

export default function ProductsListing({
  searchParams,
}: ProductsListingProps) {
  return (
    <main className="page-shell">
      <section className="section-shell space-y-6">
        <div className="section-heading mb-4">
          <p className="eyebrow animate-fade-up">Catalogue</p>
          <h1 className="h2 mt-1 animate-fade-up delay-75">
            Discover your next standout look.
          </h1>
        </div>

        <Suspense fallback={<ProductsPageSkeleton />}>
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
