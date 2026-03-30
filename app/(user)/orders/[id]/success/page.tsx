import { ordersIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { getOrder, setOrderAsSeen } from "@/server/data-access/orders";
import { assertAuthenticated } from "@/server/lucia/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OrderSuccess({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await assertAuthenticated();

  const id = (await params).id;

  const order = await getOrder(+id);

  if (!order || order.isSeen) {
    return redirect("/account");
  }

  setOrderAsSeen({ orderId: +id });

  return (
    <main className="page-shell section-shell">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-y-6 rounded-[2rem] border border-zinc-200/80 bg-zinc-50 px-6 py-12 text-center shadow-sm md:px-10">
        <Image className="size-24" src={ordersIcon} alt="order icon" />

        <p className="eyebrow">Order confirmed</p>
        <h2 className="h2">Thank you for shopping with us</h2>
        <p className="max-w-lg text-sm text-zinc-600 md:text-base">
          Your order has been placed successfully and is now being processed by
          our fulfillment team.
        </p>
        <Link href="/account">
          <Button variant="primary">Go to my account</Button>
        </Link>
      </div>
    </main>
  );
}
