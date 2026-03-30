"use client";

import QuantitySelector from "../../products/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductImage from "../../products/components/ProductImage";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import { useUpdateCartItemQuantity } from "../hooks/useUpdateCartItemQuantity";
import type { CartItem } from "../types";
import { minusIcon } from "@/assets";
import { useCart } from "../hooks/useCart";
import { xIcon } from "@/assets";
import EmptyListMessage from "@/lib/components/EmptyListMessage";
import Link from "next/link";

export default function CartContainer() {
  const { data } = useCart();

  if (!data || !data.cart || data.cart.cartItems.length === 0)
    return <EmptyListMessage listName="Cart" />;

  const subtotalPrice = data.cart.cartItems.reduce(
    (acc, cur) => acc + cur.itemPrice * cur.quantity,
    0,
  );

  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <ul className="space-y-4">
        {data.cart.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="section-muted flex h-fit w-full flex-col px-5 py-6 md:sticky md:top-24">
        <h4 className="h4">Order Summary</h4>
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Subtotal</p>
          <p className="font-medium text-zinc-900">
            $ {subtotalPrice.toFixed(2)}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Shipping</p>
          <p className="font-medium text-zinc-900">Free</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Tax</p>
          <p className="font-medium text-zinc-900">$ 0.00</p>
        </div>
        <hr className="mt-8 border-zinc-200" />
        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium text-zinc-900">Total</p>
          <p className="font-medium text-zinc-900">
            $ {subtotalPrice.toFixed(2)}
          </p>
        </div>
        <Link className="block w-full" href="/checkout">
          <Button variant="primary" className="mt-8 w-full">
            Checkout
          </Button>
        </Link>
        <Link className="mt-6 text-center" href="/products">
          <Button className="text-zinc-700" variant="link">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CartItem({
  item: {
    quantity,
    itemPrice,
    id,

    size: {
      size,
      quantity: productQuantity,
      variant: {
        images,
        color: { hexCode },
        product: { name },
      },
    },
  },
}: {
  item: CartItem;
}) {
  const { mutate: updateQuantity } = useUpdateCartItemQuantity();

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteCartItem();

  const handleDeleteItem = () => {
    deleteItem({ id });
  };

  const handleIncreaseQuantity = () => {
    if (quantity + 1 === productQuantity) return;
    updateQuantity({ quantity: quantity + 1, cartItemId: id });
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    updateQuantity({ quantity: quantity - 1, cartItemId: id });
  };
  return (
    <li className="rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-y-4 lg:flex-row">
        <div className="flex w-full items-center justify-between gap-x-4 lg:w-fit">
          <ProductImage
            imageUrl={images[0].imagePath}
            alt="product image"
            className="size-28 flex-none bg-zinc-100"
          />
          <div className="inline-flex flex-col justify-between gap-3">
            <p className="text-base font-semibold text-zinc-800">{name}</p>
            <div className="inline-flex items-center gap-3">
              <span className="text-sm text-zinc-500">Color:</span>
              <div
                className="size-4 rounded-full border p-0.5"
                style={{ backgroundColor: hexCode }}
              />

              <Image src={minusIcon} alt="minus icon" />
              <span className="text-sm text-zinc-500">Size:</span>
              <p className="text-zinc-600">{size}</p>
            </div>
          </div>
        </div>
        <div className="inline-flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:flex-nowrap sm:gap-5">
          <p className="text-lg font-semibold text-zinc-900">
            ${itemPrice.toFixed(2)}
          </p>
          <QuantitySelector
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            value={quantity}
            maxValue={productQuantity}
          />
          <Button
            onClick={handleDeleteItem}
            disabled={isDeleting}
            className="size-10 rounded-xl p-0 sm:size-12"
            variant="secondary"
          >
            <Image src={xIcon} width={24} height={24} alt="x icon" />
          </Button>
        </div>
      </div>
    </li>
  );
}
