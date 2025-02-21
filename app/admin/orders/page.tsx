import AdminPageLayout from "@/lib/components/AdminPageLayout";
import OrdersAdminContainer from "@/lib/features/orders-admin/components/orders-admin-container";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAdmin } from "@/server/lucia/utils";

interface OrdersPageProps {
  searchParams: Promise<{
    page: string | undefined;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  await assertAdmin();

  const OrdersPageParams = await searchParams;

  const page = Number(OrdersPageParams.page || 1);

  await serverTrpc.orders.getOrders.prefetch({ page, perPage: 8 });

  serverTrpc.orders.getOrders.prefetch({ page: page + 1, perPage: 8 });
  if (page > 1) {
    serverTrpc.orders.getOrders.prefetch({ page: page - 1, perPage: 8 });
  }

  return (
    <AdminPageLayout to="Orders">
      <HydrateClient>
        <OrdersAdminContainer />
      </HydrateClient>
    </AdminPageLayout>
  );
}
