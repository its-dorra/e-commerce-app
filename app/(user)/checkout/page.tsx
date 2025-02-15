import UserPageLayout from "@/lib/components/UserPageLayout";
import CheckoutContainer from "@/lib/features/checkout/components/checkout-container";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const user = await assertAuthenticated();

  if (user.role !== "user") {
    redirect("/dashboard");
  }

  await Promise.all([
    serverTrpc.auth.getCurrentUser.prefetch(),
    serverTrpc.carts.getCart.prefetch(),
    serverTrpc.address.getUserAddress.prefetch(),
  ]);

  return (
    <UserPageLayout title="Checkout">
      <HydrateClient>
        <CheckoutContainer />
      </HydrateClient>
    </UserPageLayout>
  );
}
