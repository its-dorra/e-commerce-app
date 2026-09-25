import UserPageLayout from "@/lib/components/UserPageLayout";
import UserOrdersContainer from "@/lib/features/orders/components/user-orders-container";
import { assertAuthenticated } from "@/lib/auth";
import { getOrdersByUser } from "@/server/data-access/orders";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { UserOrdersSkeleton } from "@/lib/components/skeletons/account-skeletons";

interface OrdersPageProps {
  searchParams?: Promise<{ page?: string }>;
}

export const prefetch = "partial";

async function OrdersContent({ searchParams }: OrdersPageProps) {
  const user = await assertAuthenticated();

  if (user.role === "admin") {
    return redirect("/dashboard");
  }

  const params = await searchParams;
  const page = Number(params?.page || 1);

  const ordersData = await getOrdersByUser({
    userId: user.id,
    page,
    perPage: 6,
  });

  return <UserOrdersContainer ordersData={ordersData} />;
}

export default function OrdersPage(props: OrdersPageProps) {
  return (
    <UserPageLayout title="Orders">
      <Suspense fallback={<UserOrdersSkeleton />}>
        <OrdersContent searchParams={props.searchParams} />
      </Suspense>
    </UserPageLayout>
  );
}
