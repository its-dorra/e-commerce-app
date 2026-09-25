"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";
import ProductImage from "../../products/components/ProductImage";
import { type WishlistItem as WishlistItemType } from "../types";
import Link from "next/link";
import EmptyListMessage from "@/lib/components/EmptyListMessage";
import Image from "next/image";
import { xIcon } from "@/assets";
import { toggleWishlistItemAction } from "@/server/actions/wishlist";

export default function WishlistContainer({
  items,
}: {
  items?: WishlistItemType[] | null;
}) {
  const [optimisticItems, dispatchOptimistic] = useOptimistic(
    items ?? [],
    (state, productIdToRemove: string) =>
      state.filter((item) => item.productId !== productIdToRemove),
  );
  const [, startTransition] = useTransition();

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      dispatchOptimistic(productId);
      await toggleWishlistItemAction({ productId });
    });
  };

  if (!optimisticItems || optimisticItems.length === 0)
    return <EmptyListMessage listName="Wishlist" />;

  return (
    <ul className="flex flex-col items-stretch gap-y-4">
      {optimisticItems.map((item) => (
        <WishlistItem
          key={`${item.productId}-${item.userId}`}
          item={item}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
}

function WishlistItem({
  item,
  onRemove,
}: {
  item: WishlistItemType;
  onRemove: (productId: string) => void;
}) {
  const variant = item.product.variants[0];

  return (
    <li className="shadow-2xs flex w-full max-w-2xl items-center rounded-2xl border border-stone-200/80 bg-white p-4 transition-all hover:border-stone-300">
      <ProductImage
        imageUrl={variant?.images[0]?.imagePath || ""}
        alt="Product image"
        className="mr-5 size-20 flex-none rounded-xl bg-stone-100"
      />
      <div className="mr-auto space-y-1">
        <h5 className="font-display text-base font-medium text-stone-900">
          {item.product.name}
        </h5>
        <p className="font-body text-xs font-semibold text-stone-700">
          ${item.product.basePrice.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/products/${item.productId}`}>
          <Button
            variant="outline"
            size="sm"
            className="font-body text-xs text-stone-800 hover:text-stone-950"
          >
            View Item
          </Button>
        </Link>
        <Button
          onClick={() => onRemove(item.productId)}
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          title="Remove from wishlist"
        >
          <Image src={xIcon} width={16} height={16} alt="Remove item" />
        </Button>
      </div>
    </li>
  );
}
