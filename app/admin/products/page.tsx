import AdminPageLayout from "@/lib/components/AdminPageLayout";
import AdminProductsContainer from "@/lib/features/admin-products/components/admin-products-container";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAdmin } from "@/server/lucia/utils";

interface ProductsProps {
  searchParams: Promise<{
    page: string | undefined;
  }>;
}

export default async function ProductManagement(props: ProductsProps) {
  await assertAdmin();

  const adminPageProps = await props.searchParams;

  const page = Number(adminPageProps.page || 1);

  await Promise.all([
    serverTrpc.products.products.prefetch({ page, perPage: 8 }),
    serverTrpc.products.products.prefetch({ page: page + 1, perPage: 8 }),
    page > 1 &&
      serverTrpc.products.products.prefetch({ page: page - 1, perPage: 8 }),
  ]);

  return (
    <HydrateClient>
      <AdminPageLayout to="Products">
        <AdminProductsContainer />
      </AdminPageLayout>
    </HydrateClient>
  );
}
