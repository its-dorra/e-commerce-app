import UserPageLayout from "@/lib/components/UserPageLayout";
import CartContainer from "@/lib/features/cart/components/CartContainer";
import { HydrateClient, serverTrpc } from "@/lib/trpc/server";
import { assertAuthenticated } from "@/server/lucia/utils";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const user = await assertAuthenticated();

  const userRole = user.role;

  if (userRole === "admin") {
    return redirect("/dashboard");
  }

  await serverTrpc.carts.getCart.prefetch();

  return (
    <main className="container mt-8">
      <UserPageLayout title="Your Cart">
        <HydrateClient>
          <CartContainer />
        </HydrateClient>
      </UserPageLayout>
    </main>
  );
}
