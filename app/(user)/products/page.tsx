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
import env from "@/server/env";
import { Size } from "@/server/types/products";
import { getCurrentUser } from "@/server/lucia/utils";
import { redirect } from "next/navigation";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import ProductsClient from "@/lib/features/products/components/ProductsClient";

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

interface ProductsProps {
  searchParams: Promise<{
    categories: string | string[] | undefined;
    colors: string | string[] | undefined;
    sizes: Size | Size[] | undefined;
    page: string | undefined;
  }>;
}

async function Products({
  searchParams,
}: {
  searchParams: Awaited<ProductsProps["searchParams"]>;
}) {
  const user = await getCurrentUser();

  const userRole = user?.role;

  if (userRole === "admin") {
    return redirect("/admin/dashboard");
  }

  const page = Number(searchParams.page || 1);

  const { categories = [], colors = [], sizes = [] } = searchParams;

  await Promise.all([
    serverTrpc.products.products.prefetch({
      page,
      perPage: 8,
      categories,
      colors,
      sizes,
    }),
    serverTrpc.products.products.prefetch({
      page: page + 1,
      perPage: 8,
      categories,
      colors,
      sizes,
    }),
    page > 1 &&
      serverTrpc.products.products.prefetch({
        page: page - 1,
        perPage: 8,
        categories,
        colors,
        sizes,
      }),
  ]);

  return (
    <HydrateClient>
      <ProductsClient />
    </HydrateClient>
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
      <Suspense fallback={<LoadingSpinner size="xl" />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
