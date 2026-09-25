"use client";

import { Button } from "@/components/ui/button";
import ProductImage from "../../products/components/ProductImage";
import Image from "next/image";
import { minusIcon, xIcon } from "@/assets";
import QuantitySelector from "../../products/components/QuantitySelector";
import { type CartItem } from "../types";
import { useAction } from "next-safe-action/hooks";
import {
  deleteCartItemAction,
  updateCartItemQuantityAction,
} from "@/server/actions/cart";

export default function CartItem({
  item,
  onDelete,
  onUpdate,
}: {
  item: CartItem;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, quantity: number) => void;
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

  const { execute: updateQuantity, isPending: isUpdating } = useAction(
    updateCartItemQuantityAction,
  );
  const { execute: deleteItem, isPending: isDeleting } =
    useAction(deleteCartItemAction);

  const handleDeleteItem = () => {
    if (onDelete) {
      onDelete(id);
    } else {
      deleteItem({ id });
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity + 1 > productQuantity) return;
    if (onUpdate) {
      onUpdate(id, quantity + 1);
    } else {
      updateQuantity({ quantity: quantity + 1, cartItemId: id });
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    if (onUpdate) {
      onUpdate(id, quantity - 1);
    } else {
      updateQuantity({ quantity: quantity - 1, cartItemId: id });
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-200/70 bg-zinc-50 p-3 last:border-zinc-200/70">
      <div className="relative">
        <ProductImage
          imageUrl={images[0]?.imagePath || ""}
          alt="product image"
          className="size-24 flex-none bg-zinc-100"
        />
        <Button
          disabled={isDeleting}
          onClick={handleDeleteItem}
          className="absolute right-0 top-0 size-5 bg-transparent p-0 hover:bg-zinc-200"
          variant="ghost"
        >
          <Image src={xIcon} width={18} height={18} alt="x icon" />
        </Button>
      </div>
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="inline-flex items-center gap-3">
          <p className="text-sm font-semibold text-zinc-800">{name}</p>
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: hexCode }}
          />
          <Image src={minusIcon} alt="minus icon" />
          <p className="text-zinc-500">{size}</p>
        </div>
        <div className="inline-flex items-center gap-x-4">
          <QuantitySelector
            size="icon"
            value={quantity}
            maxValue={productQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            disabled={isUpdating}
          />
          <p className="text-sm font-semibold text-zinc-800">
            ${itemPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
