import UserPageLayout from "@/lib/components/UserPageLayout";
import CartContainer from "@/lib/features/cart/components/CartContainer";
import { assertAuthenticated } from "@/lib/auth";
import { getCartItems } from "@/server/data-access/cart";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CartSkeleton } from "@/lib/components/skeletons/cart-checkout-skeletons";

export const prefetch = "partial";

async function CartContent() {
  const user = await assertAuthenticated();

  if (user.role === "admin") {
    return redirect("/dashboard");
  }

  const cart = await getCartItems(user.id);

  return <CartContainer cart={cart} />;
}

export default function CartPage() {
  return (
    <main className="page-shell section-shell">
      <UserPageLayout title="Your Cart">
        <Suspense fallback={<CartSkeleton />}>
          <CartContent />
        </Suspense>
      </UserPageLayout>
    </main>
  );
}
