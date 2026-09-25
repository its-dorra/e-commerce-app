"use client";

import { useOptimistic, useTransition, useMemo } from "react";
import QuantitySelector from "../../products/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductImage from "../../products/components/ProductImage";
import type { Cart, CartItem as CartItemType } from "../types";
import { xIcon } from "@/assets";
import EmptyListMessage from "@/lib/components/EmptyListMessage";
import Link from "next/link";
import {
  deleteCartItemAction,
  updateCartItemQuantityAction,
} from "@/server/actions/cart";

type OptimisticAction =
  | { type: "delete"; id: string }
  | { type: "update"; id: string; quantity: number };

function applyOptimistic(
  items: CartItemType[],
  action: OptimisticAction,
): CartItemType[] {
  if (action.type === "delete") {
    return items.filter((item) => item.id !== action.id);
  }
  return items.map((item) =>
    item.id === action.id ? { ...item, quantity: action.quantity } : item,
  );
}

export default function CartContainer({ cart }: { cart?: Cart | null }) {
  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    cart?.cartItems ?? [],
    applyOptimistic,
  );
  const [, startTransition] = useTransition();

  const totalPrice = useMemo(() => {
    return optimisticItems
      .reduce((acc, cur) => acc + cur.quantity * cur.itemPrice, 0)
      .toFixed(2);
  }, [optimisticItems]);

  if (!cart || !cart.cartItems || cart.cartItems.length === 0)
    return <EmptyListMessage listName="Cart" />;

  if (optimisticItems.length === 0) return <EmptyListMessage listName="Cart" />;

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
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <ul className="space-y-4">
        {optimisticItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
      <div className="shadow-xs rounded-2xl border border-stone-200/80 bg-white p-6 md:sticky md:top-28">
        <h4 className="font-display text-xl font-medium tracking-tight text-stone-900">
          Order Summary
        </h4>
        <div className="mt-6 space-y-3 font-body text-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span>Subtotal</span>
            <span className="font-semibold text-stone-900">$ {totalPrice}</span>
          </div>
          <div className="flex items-center justify-between text-stone-500">
            <span>Estimated Shipping</span>
            <span className="font-medium text-emerald-700">Complimentary</span>
          </div>
          <div className="flex items-center justify-between text-stone-500">
            <span>Tax</span>
            <span className="font-medium text-stone-900">$ 0.00</span>
          </div>
        </div>
        <hr className="my-5 border-stone-100" />
        <div className="flex items-center justify-between font-body text-sm font-semibold text-stone-900">
          <span>Estimated Total</span>
          <span className="text-base text-amber-800">$ {totalPrice}</span>
        </div>
        <Link className="mt-6 block w-full" href="/checkout">
          <Button variant="primary" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
        <Link className="mt-3 block text-center" href="/products">
          <Button
            className="font-body text-xs text-stone-500 hover:text-stone-950"
            variant="link"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CartItem({
  item,
  onDelete,
  onUpdate,
}: {
  item: CartItemType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
}) {
  const {
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
  } = item;

  return (
    <li className="shadow-2xs rounded-2xl border border-stone-200/80 bg-white p-4 transition-all duration-200 hover:border-stone-300">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-4">
          <ProductImage
            imageUrl={images[0]?.imagePath || ""}
            alt="product image"
            className="size-24 flex-none rounded-xl bg-stone-100"
          />
          <div className="space-y-1.5">
            <h5 className="font-display text-base font-medium text-stone-900">
              {name}
            </h5>
            <div className="flex items-center gap-3 font-body text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                Color:
                <span
                  className="inline-block size-3.5 rounded-full border border-stone-300 shadow-inner"
                  style={{ backgroundColor: hexCode }}
                />
              </span>
              <span>•</span>
              <span>
                Size:{" "}
                <strong className="uppercase text-stone-800">{size}</strong>
              </span>
            </div>
            <p className="font-body text-sm font-semibold text-stone-900 sm:hidden">
              ${itemPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
          <p className="hidden font-body text-base font-semibold text-stone-900 sm:block">
            ${itemPrice.toFixed(2)}
          </p>
          <QuantitySelector
            handleDecreaseQuantity={() => {
              if (quantity <= 1) return;
              onUpdate(id, quantity - 1);
            }}
            handleIncreaseQuantity={() => {
              if (quantity + 1 > productQuantity) return;
              onUpdate(id, quantity + 1);
            }}
            value={quantity}
            maxValue={productQuantity}
          />
          <Button
            onClick={() => onDelete(id)}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <Image src={xIcon} width={16} height={16} alt="Remove item" />
          </Button>
        </div>
      </div>
    </li>
  );
}
