"use client";

import LoadingSpinner from "@/lib/components/LoadingSpinner";
import { useGetOrdersByUser } from "../hooks/useGetOrdersByUser";
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

type OrderProps = Exclude<
  ReturnType<typeof useGetOrdersByUser>["data"],
  undefined
>["data"][number];

type OrderItemProps = OrderProps["orderItems"][number];

export default function UserOrdersContainer() {
  const { data, isPending, isError } = useGetOrdersByUser();

  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      <div className="flex flex-col space-y-4">
        {data.data.length === 0 && <EmptyListMessage listName="Orders" />}
        {data.data.length > 0 && (
          <Accordion className="rounded border" type="single" collapsible>
            {data.data.map((order) => {
              return <Order key={order.id} order={order} />;
            })}
          </Accordion>
        )}
      </div>

      <PaginationComponent count={data.pagination.totalCount} perPage={6} />
    </div>
  );
}

function Order({ order }: { order: OrderProps }) {
  return (
    <AccordionItem className="mb-2" value={`${order.id}`}>
      <AccordionTrigger className="flex flex-wrap justify-between gap-x-4 rounded-lg bg-gray-100 p-4 hover:bg-gray-200 hover:no-underline">
        <div>
          <span className="font-bold">Order ID:</span> {order.id}
        </div>
        <div>
          <span className="font-bold">Total Price:</span> ${order.totalPrice}
        </div>
        <div>
          <span className="font-bold">Status:</span>{" "}
          {capitalizeWords(order.status)}
        </div>
        <div>
          <span className="font-bold">Created At:</span>{" "}
          {order.createdAt?.toLocaleDateString(undefined, {
            weekday: "narrow",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {order.orderItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function OrderItem({ item }: { item: OrderItemProps }) {
  return (
    <div className="flex items-center gap-x-4 border-b px-4 py-3 last:border-none md:gap-x-8 lg:gap-x-12">
      <ProductImage
        imageUrl={item.size.variant.images[0].imagePath}
        alt="Product image"
        className="size-20"
      />
      <div className="flex flex-col justify-between gap-y-4">
        <p className="font-semibold">{item.size.variant.product.name}</p>
        <p>
          ${item.itemPrice} x {item.quantity} = $
          {item.quantity * item.itemPrice}
        </p>
      </div>
      <Link
        className="ml-auto"
        href={`/products/${item.size.variant.product.id}`}
      >
        <Button variant="outline" className="border border-black">
          View Item
        </Button>
      </Link>
    </div>
  );
}
