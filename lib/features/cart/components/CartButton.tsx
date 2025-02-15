"use client";

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
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../hooks/useCart";
import LoadingSpinner from "@/lib/components/LoadingSpinner";
import CartItem from "./CartItem";

export default function CartButton() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useCart();

  const totalPrice =
    data?.cart &&
    data?.cart.cartItems.reduce(
      (acc, cur) => acc + cur.quantity * cur.itemPrice,
      0,
    );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => {
          if (!user) {
            toast.error("You need to be logged in to view the cart");
            return;
          }
          setIsOpen(true);
        }}
        className="ml-auto mr-4 cursor-pointer rounded-full p-2 hover:bg-gray-100 lg:ml-4"
      >
        <Image src={cartIcon} alt="user icon" />
      </button>
      <SheetContent className="flex min-w-fit max-w-xl flex-col">
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto">
          {isError ? (
            <p className="">Can&apos;t get your cart</p>
          ) : (
            <>
              {isLoading && <LoadingSpinner size="lg" />}
              {!data?.cart || data?.cart?.cartItems?.length === 0 ? (
                <div className="flex grow items-center justify-center">
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Your cart is empty</p>
                    <Button variant="link">
                      <Link
                        className="inline-flex items-center gap-2"
                        href="/products"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Start shopping now</span>
                        <Image src={cartIcon} alt="cart icon" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-5">
                  {data.cart.cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <div className="flex w-full flex-col items-stretch gap-y-3">
          <div className="flex items-center justify-between">
            {!!totalPrice && (
              <>
                <p className="semi-bold">Total</p>
                <p className="semi-bold">$ {totalPrice}</p>
              </>
            )}
          </div>
          <Button disabled={!totalPrice}>
            <Link href='/cart'>View Cart</Link>
          </Button>
          <Button variant="link" disabled={!totalPrice}>
            <Link
              href="/checkout"
              className="text-center text-sm text-muted-foreground"
            >
              Checkout
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
