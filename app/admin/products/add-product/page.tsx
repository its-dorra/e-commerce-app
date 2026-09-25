import { assertAdmin } from "@/lib/auth";
import AdminPageLayout from "@/lib/components/AdminPageLayout";
import AddProductContainer from "@/lib/features/admin-products/components/add-product-container";
import {
  getCategories,
  getColors,
  getSizes,
} from "@/lib/features/products/services";
import { Suspense } from "react";
import { AdminAddProductSkeleton } from "@/lib/components/skeletons/admin-skeletons";

async function AddProductContent() {
  await assertAdmin();

  const [categories, colors, sizes] = await Promise.all([
    getCategories(),
    getColors(),
    getSizes(),
  ]);

  return (
    <AddProductContainer
      categories={categories}
      colors={colors}
      sizes={sizes}
    />
  );
}

export default function AddProductPage() {
  return (
    <AdminPageLayout
      before={[{ href: "/admin/products", to: "Products" }]}
      to="Add Product"
    >
      <Suspense fallback={<AdminAddProductSkeleton />}>
        <AddProductContent />
      </Suspense>
    </AdminPageLayout>
  );
}
