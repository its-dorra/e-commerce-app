import AdminPageLayout from "@/lib/components/AdminPageLayout";
import AdminProductsContainer from "@/lib/features/admin-products/components/admin-products-container";
import { assertAdmin } from "@/lib/auth";
import { getProducts } from "@/server/data-access/products";
import { Suspense } from "react";
import { AdminProductsSkeleton } from "@/lib/components/skeletons/admin-skeletons";

interface ProductsProps {
  searchParams: Promise<{
    page: string | undefined;
  }>;
}

async function ProductsContent({ searchParams }: ProductsProps) {
  await assertAdmin();

  const adminPageProps = await searchParams;
  const page = Number(adminPageProps.page || 1);

  const productsData = await getProducts(page, {}, 8);

  return <AdminProductsContainer productsData={productsData} />;
}

export default function ProductManagement(props: ProductsProps) {
  return (
    <AdminPageLayout to="Products">
      <Suspense fallback={<AdminProductsSkeleton />}>
        <ProductsContent searchParams={props.searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}
