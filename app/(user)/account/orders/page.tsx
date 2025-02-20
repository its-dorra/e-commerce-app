import UserPageLayout from "@/lib/components/UserPageLayout";
import UserOrdersContainer from "@/lib/features/orders/components/user-orders-container";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function OrdersPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  const searchParams = await props.searchParams;

  const page = Number(searchParams?.page || 1);

  await serverTrpc.orders.getOrdersByUser.prefetch({ page, perPage: 6 });

  return (
    <UserPageLayout title="Orders">
      <HydrateClient>
        <UserOrdersContainer />
      </HydrateClient>
    </UserPageLayout>
  );
}
