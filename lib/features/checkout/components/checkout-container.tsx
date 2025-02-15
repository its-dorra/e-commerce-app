"use client";

import EmptyListMessage from "@/lib/components/EmptyListMessage";
import { useCart } from "../../cart/hooks/useCart";
import { useAddress } from "../../address/hooks/useAddress";
import {useMemo} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/lib/components/LoadingSpinner";

export default function CheckoutContainer() {
  const { data:  cartData , isPending : isGettingCart } = useCart();
  const { data: addressData } = useAddress();

  const totalPrice = useMemo(() => {
    return cartData?.cart?.cartItems.reduce((acc, item) => {
      return acc + item.itemPrice * item.quantity;
    }, 0);
  }, []);

  if(isGettingCart) return <div className='w-full flex justify-center'><LoadingSpinner size='xl'/></div>

  if (!cartData || !cartData.cart || cartData.cart.cartItems.length === 0)
    return (
      <EmptyListMessage
        message="Your cart is empty. Plz fill it and then come again 😁"
        listName="Checkout"
      />
    );

  return (
    <div className="grid w-full grid-cols-1 items-start justify-between gap-y-16 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <h4 className="h4 font-bold">Shipping Address</h4>
        <div className="flex flex-col space-y-2">
          {!addressData?.userAddress ? (
            <>
              <p>You didn't fill your shipping address information</p>
              <Link className='w-fit' href="/account/address">
                <Button>Fill Address</Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="inline-flex flex-col gap-y-4">
        <h4 className="h4 font-bold">Your Order</h4>
        <div className="inline-flex flex-col gap-y-2">
          <div className="inline-flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {cartData.cart.cartItems.map((item) => (
                <div
                  className="size-8 rounded-full bg-gray-300 p-[6px]"
                  key={item.cartId}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={item.size.variant.images[0].imagePath}
                  />
                </div>
              ))}
            </div>
            <Button variant="outline">Edit Cart</Button>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Subtotal:</p>
            <p className='body-1 '>$ {totalPrice}</p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Shipping:</p>
            <p className='body-1 '>Free</p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Tax:</p>
            <p className='body-1 '>0</p>
          </div>
          <hr />
          <div className="inline-flex items-center justify-between">
            <p className="body-1 font-bold">Total:</p>
            <p className='body-1 font-bold'>$ {totalPrice}</p>
          </div>
          <Button disabled={!addressData?.userAddress}>Place Order</Button>
        </div>
      </div>
    </div>
  );
}
