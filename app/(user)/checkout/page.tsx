import UserPageLayout from "@/lib/components/UserPageLayout";
import CheckoutContainer from "@/lib/features/checkout/components/checkout-container";
import { assertAuthenticated } from "@/lib/auth";
import { getCartItems } from "@/server/data-access/cart";
import { getUserAddress } from "@/server/data-access/address";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CheckoutSkeleton } from "@/lib/components/skeletons/cart-checkout-skeletons";

async function CheckoutContent() {
  const user = await assertAuthenticated();

  if (user.role !== "user") {
    redirect("/dashboard");
  }

  const [cart, address] = await Promise.all([
    getCartItems(user.id),
    getUserAddress({ userId: user.id }),
  ]);

  return <CheckoutContainer cart={cart} address={address} />;
}

export default function CheckoutPage() {
  return (
    <UserPageLayout title="Checkout">
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutContent />
      </Suspense>
    </UserPageLayout>
  );
}
