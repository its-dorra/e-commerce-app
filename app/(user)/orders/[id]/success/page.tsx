import { ordersIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { getOrder, setOrderAsSeen } from "@/server/data-access/orders";
import { assertAuthenticated } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { OrderSuccessSkeleton } from "@/lib/components/skeletons/cart-checkout-skeletons";

interface OrderSuccessProps {
  params: Promise<{ id: string }>;
}

async function OrderSuccessContent({ params }: OrderSuccessProps) {
  await assertAuthenticated();

  const id = (await params).id;
  const order = await getOrder(id);

  if (!order || order.isSeen) {
    return redirect("/account");
  }

  await setOrderAsSeen({ orderId: id });

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-y-6 rounded-3xl border border-stone-200/80 bg-white px-8 py-16 text-center shadow-sm md:px-12">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-amber-500/10 p-3">
        <Image
          className="size-12 object-contain"
          src={ordersIcon}
          alt="Order confirmed icon"
        />
      </div>

      <div className="space-y-2">
        <p className="eyebrow">Order Confirmed</p>
        <h2 className="font-display text-3xl font-normal text-stone-900 md:text-4xl">
          Thank you for shopping with us
        </h2>
      </div>

      <p className="font-body max-w-md text-xs font-light leading-relaxed text-stone-600 md:text-sm">
        Your order has been safely placed and transmitted to our atelier for
        careful packaging and fulfillment.
      </p>

      <Link href="/account/orders" className="pt-2">
        <Button variant="primary" size="lg" className="font-medium">
          View My Orders
        </Button>
      </Link>
    </div>
  );
}

export default function OrderSuccess(props: OrderSuccessProps) {
  return (
    <main className="page-shell section-shell">
      <Suspense fallback={<OrderSuccessSkeleton />}>
        <OrderSuccessContent params={props.params} />
      </Suspense>
    </main>
  );
}
