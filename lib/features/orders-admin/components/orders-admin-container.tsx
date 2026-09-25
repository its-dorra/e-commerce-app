"use client";

import { Ellipsis } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/lib/components/PaginationComponent";
import { capitalizeWords } from "@/lib/utils";
import ProductImage from "../../products/components/ProductImage";
import { useAction } from "next-safe-action/hooks";
import { acceptOrderAction, cancelOrderAction } from "@/server/actions/orders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { getOrders } from "@/server/data-access/orders";

type OrdersResponse = Awaited<ReturnType<typeof getOrders>>;
type OrderType = OrdersResponse["data"][number];
type OrderItemType = OrderType["orderItems"][number];

interface OrdersAdminContainerProps {
  initialData: OrdersResponse;
}

interface OrderItemProps {
  item: OrderItemType;
}

interface OrderProps {
  order: OrderType;
}

export default function OrdersAdminContainer({
  initialData,
}: OrdersAdminContainerProps) {
  return (
    <main className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
      <h4 className="h4">Orders</h4>
      {initialData.pagination.totalCount === 0 ? (
        <h4 className="h4">There's no orders to show</h4>
      ) : (
        <div className="flex w-full flex-col gap-4" role="table">
          <div
            className="grid grid-flow-col grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] border-b border-t border-gray-200 py-2"
            role="row"
          >
            <div className="table-cell font-semibold" role="columnheader">
              ID
            </div>
            <div className="table-cell font-semibold" role="columnheader">
              Date
            </div>
            <div className="table-cell font-semibold" role="columnheader">
              Total
            </div>
            <div className="table-cell font-semibold" role="columnheader">
              Status
            </div>
            <div className="table-cell font-semibold" role="columnheader">
              PhoneNumber
            </div>
            <div
              className="table-cell text-right font-semibold"
              role="columnheader"
            >
              Actions
            </div>
          </div>

          <Accordion type="single" collapsible>
            <div className="flex flex-col gap-y-2" role="rowgroup">
              {initialData.data.map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </div>
          </Accordion>
        </div>
      )}
      <PaginationComponent
        count={initialData.pagination.totalCount}
        perPage={initialData.pagination.perPage}
      />
    </main>
  );
}

function Order({ order }: OrderProps) {
  const router = useRouter();

  const { execute: acceptOrder, isPending: isAccepting } = useAction(
    acceptOrderAction,
    {
      onSuccess: () => {
        toast.success("Order accepted successfully");
        router.refresh();
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to accept order");
      },
    },
  );

  const { execute: cancelOrder, isPending: isCanceling } = useAction(
    cancelOrderAction,
    {
      onSuccess: () => {
        toast.success("Order canceled successfully");
        router.refresh();
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to cancel order");
      },
    },
  );

  const allItemsAvailable = order.orderItems.every(
    (item) =>
      item.itemPrice ===
        item.size.variant.product.basePrice +
          (item.size.priceAdjustment ?? 0) &&
      item.quantity <= item.size.quantity,
  );

  return (
    <AccordionItem
      className="w-full rounded-sm border-none"
      value={`${order.id}`}
    >
      <AccordionTrigger className="w-full text-left hover:bg-gray-50 hover:no-underline">
        <div
          className="grid w-full grid-flow-col grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] gap-x-2"
          role="row"
        >
          <div className="truncate" role="cell">
            {order.id}
          </div>
          <div role="cell">
            {order.createdAt?.toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          <div className="" role="cell">
            ${order.totalPrice.toLocaleString("en-US")}
          </div>
          <div className="" role="cell">
            {capitalizeWords(order.status)}
          </div>
          <div className="" role="cell">
            {order.phoneNumber}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="flex items-center justify-between gap-x-6">
          <div className="flex w-full flex-col gap-y-2">
            {order.orderItems.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer border-black/40"
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    disabled={
                      order.status === "canceled" ||
                      order.status === "delivered" ||
                      order.status === "processing" ||
                      isAccepting ||
                      !allItemsAvailable
                    }
                    className="cursor-pointer"
                    onClick={() => acceptOrder({ orderId: order.id })}
                  >
                    {isAccepting ? "Accepting..." : "Accept"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={
                      order.status === "canceled" ||
                      order.status === "delivered" ||
                      isCanceling
                    }
                    className="cursor-pointer"
                    onClick={() => cancelOrder({ orderId: order.id })}
                  >
                    {isCanceling ? "Canceling..." : "Cancel"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex w-full items-center gap-x-12 border-b px-2 py-3 last:border-none hover:bg-gray-50">
      <ProductImage
        className="size-16"
        imageUrl={item.size.variant.images[0].imagePath}
        alt="Product image"
      />
      <div className="flex flex-col justify-between gap-y-1">
        <p>{item.size.variant.product.name}</p>
        <p>
          <span>
            ${item.itemPrice} x {item.quantity} = $
            {item.itemPrice * item.quantity}
          </span>
        </p>
        <div className="flex items-center gap-x-1">
          <p>
            <span className="font-semibold">Size:</span> {item.size.size}
          </p>
          <span>-</span>
          <div className="flex items-center gap-x-2">
            <span className="font-semibold">Color:</span>
            <div
              className="size-4 rounded-full"
              style={{ backgroundColor: `${item.size.variant.color.hexCode}` }}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-full flex-col justify-between gap-y-2">
        {item.itemPrice !==
          item.size.variant.product.basePrice +
            (item.size.priceAdjustment ?? 0) && (
          <p className="rounded-sm bg-red-200 p-0.5 text-xs text-red-500">
            Price has changed, please cancel the order
          </p>
        )}
        {item.quantity > item.size.quantity && (
          <p className="rounded-sm bg-red-200 p-0.5 text-xs text-red-500">
            Quantity not available
          </p>
        )}
      </div>
    </div>
  );
}
