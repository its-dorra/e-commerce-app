"use client";

import { Button } from "@/components/ui/button";
import ProductImage from "../../products/components/ProductImage";
import { useWishlist } from "../hooks/useWishlist";
import { type WishlistItem } from "../types";
import Link from "next/link";
import EmptyListMessage from "@/lib/components/EmptyListMessage";

export default function WishlistContainer() {
  const { data, isPending } = useWishlist();

  if (!data || data.length === 0)
    return <EmptyListMessage listName="Wishlist" />;

  return (
    <ul className="flex flex-col items-stretch gap-y-4">
      {data.map((item) => (
        <WishlistItem key={`${item.productId}-${item.userId}`} item={item} />
      ))}
    </ul>
  );
}

function WishlistItem({ item }: { item: WishlistItem }) {
  return (
    <li className="flex w-[32rem] max-w-full items-center border-b pb-4 last:border-none">
      <ProductImage
        imageUrl={item.product.variants[0].images[0].imagePath}
        alt="Product image"
        className="mr-4 size-20"
      />
      <div className="mr-auto space-y-2">
        <p className="text-base font-medium">{item.product.name}</p>
        <p className="text-sm font-semibold">${item.product.basePrice}</p>
      </div>
      <Button variant="outline">
        <Link href={`/products/${item.productId}`}>View Item</Link>
      </Button>
    </li>
  );
}
