"use client";

import { Ellipsis } from "lucide-react";
import { useAdminOrders } from "../hooks/useAdminOrders";
import {
  Accordion,
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

export default function OrdersAdminContainer() {
  const { data } = useAdminOrders();

  return (
    <main className="flex h-full flex-col gap-y-4 rounded-lg bg-white p-6">
      <h4 className="h4">Orders</h4>
      <div className="flex w-full flex-col gap-4" role="table">
        <div
          className="grid grid-flow-col grid-cols-[100px_2fr_1fr_1fr_1fr] border-b border-t border-gray-200 py-2"
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
              <AccordionItem
                className="w-full border-none"
                key={order.id}
                value={`${order.id}`}
              >
                <AccordionTrigger className="w-full p-0 text-left hover:no-underline">
                  <div
                    className="grid w-full grid-flow-col grid-cols-[100px_2fr_1fr_1fr_1fr]"
                    role="row"
                  >
                    <div className="text-ellipsis" role="cell">
                      {order.id}
                    </div>
                    <div className="" role="cell">
                      {order.createdAt?.toLocaleString()}
                    </div>
                    <div className="" role="cell">
                      ${order.totalPrice.toLocaleString("en-US")}
                    </div>
                    <div className="" role="cell">
                      {order.status}
                    </div>
                    <div className="text-right" role="cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>Accept</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </AccordionTrigger>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
      <PaginationComponent
        count={data?.pagination.totalCount || 0}
        perPage={data?.pagination.perPage || 0}
      />
    </main>
  );
}
