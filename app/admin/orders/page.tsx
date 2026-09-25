import AdminPageLayout from "@/lib/components/AdminPageLayout";
import OrdersAdminContainer from "@/lib/features/orders-admin/components/orders-admin-container";
import { assertAdmin } from "@/lib/auth";
import { getOrders } from "@/server/data-access/orders";
import { Suspense } from "react";
import { AdminOrdersSkeleton } from "@/lib/components/skeletons/admin-skeletons";

interface OrdersPageProps {
  searchParams: Promise<{
    page: string | undefined;
  }>;
}

async function OrdersContent({ searchParams }: OrdersPageProps) {
  await assertAdmin();

  const ordersPageParams = await searchParams;
  const page = Number(ordersPageParams.page || 1);

  const ordersData = await getOrders({ page, perPage: 8 });

  return <OrdersAdminContainer initialData={ordersData} />;
}

export default function OrdersPage(props: OrdersPageProps) {
  return (
    <AdminPageLayout to="Orders">
      <Suspense fallback={<AdminOrdersSkeleton />}>
        <OrdersContent searchParams={props.searchParams} />
      </Suspense>
    </AdminPageLayout>
  );
}
