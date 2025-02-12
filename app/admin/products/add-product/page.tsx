import { assertAdmin } from "@/server/lucia/utils";
import AdminPageLayout from "@/lib/components/AdminPageLayout";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import AddProductContainer from "@/lib/features/admin-products/components/add-product-container";

export default async function AddProductPage() {
  await assertAdmin();

  await Promise.all([
    serverTrpc.filters.categories.prefetch(),
    serverTrpc.filters.colors.prefetch(),
    serverTrpc.filters.sizes.prefetch(),
  ]);

  return (
    <AdminPageLayout
      before={[{ href: "/admin/products", to: "Products" }]}
      to="Add Product"
    >
      <HydrateClient>
        <AddProductContainer />
      </HydrateClient>
    </AdminPageLayout>
  );
}
