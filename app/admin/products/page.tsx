import AdminPageLayout from "@/lib/components/AdminPageLayout";
import AdminProductsContainer from "@/lib/features/products/components/admin-products-container";

export default function ProductManagement() {
  return (
    <AdminPageLayout to="Products">
      <AdminProductsContainer />
    </AdminPageLayout>
  );
}
