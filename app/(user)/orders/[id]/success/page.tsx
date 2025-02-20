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
    console.log("here ------------ here");
    return redirect("/account");
  }

  setOrderAsSeen({ orderId: +id });

  return (
    <div className="container flex h-full max-w-6xl flex-col items-center justify-center gap-y-8 py-8">
      <Image className="size-32" src={ordersIcon} alt="order icon" />

      <h2 className="h2">Thank you for shopping</h2>
      <p className="text-center">
        Your order has been successfully placed and is now <br /> being
        processed
      </p>
      <Link href="/account">
        <Button>Go to my account</Button>
      </Link>
    </div>
  );
}
