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
    <div className="grid w-full grid-flow-row justify-center gap-x-16 gap-y-12 md:grid-flow-col lg:grid-cols-[1fr_auto] lg:justify-between">
      <ul className="border-t pt-8">
        {data.cart.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="flex w-[320px] flex-col rounded-md border px-4 py-8">
        <h4 className="h4">Order Summary</h4>
        <div className="mt-8 flex items-center justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-medium">$ {subtotalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-muted-foreground">Tax</p>
          <p className="font-medium">$ 0.00</p>
        </div>
        <hr className="mt-8" />
        <div className="mt-4 flex items-center justify-between">
          <p className="font-medium">Total</p>
          <p className="font-medium">$ {subtotalPrice.toFixed(2)}</p>
        </div>
        {/* 
          TODO : checkout
        */}
        <Button className="mt-8">Checkout</Button>
        <Link className="mt-8 text-center" href="/products">
          <Button className="text-black underline" variant="link">
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
    <li className="flex flex-col items-center justify-between gap-y-4 lg:flex-row">
      <div className="flex w-full items-center justify-between gap-x-4 lg:w-fit">
        <ProductImage
          imageUrl={images[0].imagePath}
          alt="product image"
          className="size-28 flex-none"
        />
        <div className="inline-flex flex-col justify-between gap-3">
          <p>{name}</p>
          <div className="inline-flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Color:</span>
            <div
              className="size-4 rounded-full border p-0.5"
              style={{ backgroundColor: hexCode }}
            />

            <Image src={minusIcon} alt="minus icon" />
            <span className="text-sm text-muted-foreground">Size:</span>
            <p className="text-muted-foreground">{size}</p>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center gap-5">
        <p className="text-lg font-semibold">${itemPrice.toFixed(2)}</p>
        <QuantitySelector
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          value={quantity}
          maxValue={productQuantity}
        />
        <Button
          onClick={handleDeleteItem}
          disabled={isDeleting}
          className="size-12 p-0"
          variant="secondary"
        >
          <Image src={xIcon} width={28} height={28} alt="x icon" />
        </Button>
      </div>
    </li>
  );
}
