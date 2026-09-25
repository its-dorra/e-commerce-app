"use client";

import PaginationComponent from "@/lib/components/PaginationComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeWords } from "@/lib/utils";
import ProductImage from "../../products/components/ProductImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyListMessage from "@/lib/components/EmptyListMessage";
import { getOrdersByUser } from "@/server/data-access/orders";

type OrdersData = Awaited<ReturnType<typeof getOrdersByUser>>;
type OrderProps = OrdersData["data"][number];
type OrderItemProps = OrderProps["orderItems"][number];

export default function UserOrdersContainer({
  ordersData,
}: {
  ordersData: OrdersData;
}) {
  if (!ordersData || ordersData.data.length === 0) {
    return <EmptyListMessage listName="Orders" />;
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      <div className="flex flex-col space-y-4">
        <Accordion className="space-y-3" type="single" collapsible>
          {ordersData.data.map((order) => {
            return <Order key={order.id} order={order} />;
          })}
        </Accordion>
      </div>

      <PaginationComponent
        count={ordersData.pagination.totalCount}
        perPage={6}
      />
    </div>
  );
}

function Order({ order }: { order: OrderProps }) {
  return (
    <AccordionItem
      className="shadow-2xs overflow-hidden rounded-2xl border border-stone-200/80 bg-white"
      value={`${order.id}`}
    >
      <AccordionTrigger className="font-body flex flex-wrap justify-between gap-x-4 p-5 text-xs hover:bg-stone-50/70 hover:no-underline">
        <div>
          <span className="font-semibold text-stone-500">Order ID:</span>{" "}
          <span className="font-medium text-stone-900">
            #{order.id.slice(0, 8)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-stone-500">Total:</span>{" "}
          <span className="font-semibold text-amber-800">
            ${order.totalPrice}
          </span>
        </div>
        <div>
          <span className="font-semibold text-stone-500">Status:</span>{" "}
          <span className="font-body inline-block rounded-md border border-amber-600/30 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
            {capitalizeWords(order.status)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-stone-500">Placed:</span>{" "}
          <span className="text-stone-700">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-3 border-t border-stone-100 bg-stone-50/40 p-5">
        {order.orderItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function OrderItem({ item }: { item: OrderItemProps }) {
  const variant = item.size.variant;
  const product = variant.product;

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-stone-200/60 bg-white p-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-x-3">
        <ProductImage
          imageUrl={variant.images[0]?.imagePath || ""}
          alt="product image"
          className="size-16 flex-none rounded-lg bg-stone-100"
        />
        <div className="space-y-1">
          <h6 className="font-display text-sm font-medium text-stone-900">
            {product.name}
          </h6>
          <div className="font-body flex items-center gap-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              Color:
              <span
                className="inline-block size-3 rounded-full border border-stone-300"
                style={{ backgroundColor: variant.color.hexCode }}
              />
            </span>
            <span>•</span>
            <span>
              Size: <strong className="uppercase">{item.size.size}</strong>
            </span>
            <span>•</span>
            <span>Qty: {item.quantity}</span>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between sm:w-auto sm:flex-col sm:items-end sm:gap-2">
        <p className="font-body text-sm font-semibold text-stone-900">
          ${(item.itemPrice * item.quantity).toFixed(2)}
        </p>
        <Link href={`/products/${product.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="font-body h-7 text-[11px]"
          >
            Buy Again
          </Button>
        </Link>
      </div>
    </div>
  );
}
