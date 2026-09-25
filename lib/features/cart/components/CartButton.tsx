"use client";

import { useOptimistic, useTransition, useState, useMemo } from "react";
import { cartIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUser } from "@/lib/providers/user-provider";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Cart, CartItem } from "../types";
import CartItemCard from "./CartItem";
import {
  deleteCartItemAction,
  updateCartItemQuantityAction,
} from "@/server/actions/cart";

type OptimisticAction =
  | { type: "delete"; id: string }
  | { type: "update"; id: string; quantity: number };

function applyOptimistic(
  items: CartItem[],
  action: OptimisticAction,
): CartItem[] {
  if (action.type === "delete") {
    return items.filter((item) => item.id !== action.id);
  }
  return items.map((item) =>
    item.id === action.id ? { ...item, quantity: action.quantity } : item,
  );
}

export default function CartButton({ cart }: { cart?: Cart | null }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    cart?.cartItems ?? [],
    applyOptimistic,
  );

  const totalPrice = useMemo(() => {
    return optimisticItems
      .reduce((acc, cur) => acc + cur.quantity * cur.itemPrice, 0)
      .toFixed(2);
  }, [optimisticItems]);

  const totalCount = useMemo(() => {
    return optimisticItems.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [optimisticItems]);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "delete", id });
      await deleteCartItemAction({ id });
    });
  };

  const handleUpdate = (id: string, quantity: number) => {
    startTransition(async () => {
      dispatchOptimistic({ type: "update", id, quantity });
      await updateCartItemQuantityAction({ cartItemId: id, quantity });
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <button
        type="button"
        onClick={() => {
          if (!user) {
            toast.error("You need to be logged in to view the cart");
            return;
          }
          setIsOpen(true);
        }}
        className="relative cursor-pointer rounded-full border border-stone-200/80 bg-white p-2.5 transition-colors hover:border-amber-700/60 hover:bg-stone-50"
      >
        <Image src={cartIcon} alt="Cart icon" className="h-4 w-4" />
        {totalCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-700 font-body text-[10px] font-semibold text-white">
            {totalCount}
          </span>
        )}
      </button>
      <SheetContent className="flex w-full max-w-full flex-col border-l border-stone-200/80 bg-white sm:max-w-md">
        <SheetHeader className="border-b border-stone-100 pb-4">
          <SheetTitle className="font-display text-2xl font-normal tracking-tight text-stone-900">
            Shopping Bag
          </SheetTitle>
        </SheetHeader>
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto py-4">
          {optimisticItems.length === 0 ? (
            <div className="flex grow items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <p className="font-display text-xl text-stone-800">
                  Your bag is empty
                </p>
                <p className="mt-1 font-body text-xs text-stone-500">
                  Explore our new arrivals and find your fit.
                </p>
                <Button
                  variant="link"
                  className="mt-3 font-body text-xs text-amber-800"
                >
                  <Link
                    className="inline-flex items-center gap-2"
                    href="/products"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Start Shopping</span>
                    <Image
                      src={cartIcon}
                      alt="cart icon"
                      className="h-3.5 w-3.5"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="w-full space-y-3 pr-1">
              {optimisticItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="flex w-full flex-col items-stretch gap-y-3 border-t border-stone-100 pt-4">
          <div className="flex items-center justify-between">
            {optimisticItems.length > 0 && (
              <>
                <p className="font-body text-sm font-medium text-stone-600">
                  Subtotal
                </p>
                <p className="font-body text-base font-semibold text-stone-900">
                  $ {totalPrice}
                </p>
              </>
            )}
          </div>
          <Button
            disabled={optimisticItems.length === 0}
            variant="primary"
            asChild
            className="w-full"
          >
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              View Cart
            </Link>
          </Button>
          <Button
            variant="outline"
            disabled={optimisticItems.length === 0}
            asChild
            className="w-full"
          >
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="text-center font-body text-xs"
            >
              Proceed to Checkout
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
