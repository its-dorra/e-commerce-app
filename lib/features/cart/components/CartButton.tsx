"use client";

import { cartIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/lib/providers/user-provider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartButton() {
  const router = useRouter();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* <SheetTrigger> */}
      <button
        onClick={() => {
          // if (!user) return router.push("/login");
          // TODO : modify it after completing the auth
          setIsOpen(true);
        }}
        className="ml-auto mr-4 cursor-pointer rounded-full p-2 hover:bg-gray-100 lg:ml-4"
      >
        <Image src={cartIcon} alt="user icon" />
      </button>
      {/* </SheetTrigger> */}
      <SheetContent className="flex min-w-fit max-w-xl flex-col">
        <SheetHeader>
          <SheetTitle>
            Your Cart{" "}
            <span className="text-base">{/* TODO: Add cart quantity */}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto">
          <ul className="space-y-5">cartItems</ul>
        </div>
        <div className="flex w-full flex-col items-stretch gap-y-3">
          <div className="flex items-center justify-between">
            <p>Total</p>
            <p>
              {
                //  TODO : total price
              }
            </p>
          </div>
          <Button>
            <Link href="/account/cart">View Cart</Link>
          </Button>
          <Link
            href="/account/checkout"
            className="text-center text-sm text-muted-foreground underline"
          >
            Checkout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CartItem() {}
