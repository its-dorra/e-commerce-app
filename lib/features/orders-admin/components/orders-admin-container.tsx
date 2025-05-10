"use client";

import { Ellipsis } from "lucide-react";
import { useAdminOrders } from "../hooks/useAdminOrders";
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
import LoadingSpinner from "@/lib/components/LoadingSpinner";
import ProductImage from "../../products/components/ProductImage";
import { useAcceptOrder } from "../hooks/useAcceptOrder";
import { useCancelOrder } from "../hooks/useCancelOrder";

interface OrderItemProps {
  item: NonNullable<
    ReturnType<typeof useAdminOrders>["data"]
  >["data"][number]["orderItems"][number];
}

interface OrderProps {
  order: NonNullable<ReturnType<typeof useAdminOrders>["data"]>["data"][number];
}

export default function OrdersAdminContainer() {
  const { data, isPending, isError } = useAdminOrders();

  if (isPending)
    return (
      <div className="flex h-full items-center justify-between">
        <LoadingSpinner size="xl" />
      </div>
    );

  if (isError) return <div>Something went wrong</div>;

  return (
    <main className="flex flex-col gap-y-4 rounded-lg bg-white p-6">
      <h4 className="h4">Orders</h4>
      {data.pagination.totalCount === 0 ? (
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
              {data?.data.map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </div>
          </Accordion>
        </div>
      )}
      <PaginationComponent
        count={data.pagination.totalCount}
        perPage={data.pagination.perPage}
      />
    </main>
  );
}

function Order({ order }: OrderProps) {
  const acceptOrderMutation = useAcceptOrder();
  const cancelOrderMutation = useCancelOrder();

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
          <div className="text-ellipsis" role="cell">
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
                      acceptOrderMutation.isPending ||
                      !allItemsAvailable
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      acceptOrderMutation.mutate({ orderId: order.id })
                    }
                  >
                    Accept
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={
                      order.status === "canceled" ||
                      order.status === "delivered" ||
                      cancelOrderMutation.isPending
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      cancelOrderMutation.mutate({ orderId: order.id })
                    }
                  >
                    Cancel
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
          <p className="text- rounded-sm bg-red-200 p-0.5 text-red-500">
            Price have changed , plz Cancel the order
          </p>
        )}
        {item.quantity > item.size.quantity && (
          <p className="rounded-sm bg-red-200 p-0.5 text-red-500">
            Quantity not available
          </p>
        )}
      </div>
    </div>
  );
}
