"use client";

import { ProductDetails } from "@/server/data-access/products";
import InStock from "./InStock";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/providers/user-provider";
import toast from "react-hot-toast";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { useIsInWishlist } from "../../wishlist/hooks/useIsInWishlist";
import { HeartIcon } from "lucide-react";
import { useToggleWishList } from "../../wishlist/hooks/useToggleWishlist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sizesOrdering: Record<string, number> = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
  "2XL": 6,
  "3XL": 7,
};

export default function ProductDetailsComponent({
  product,
}: {
  product: ProductDetails;
}) {
  const [filter, setFilter] = useState<{
    color?: string;
    size?: string;
    quantity: number;
  }>({ quantity: 1 });

  const { user } = useUser();

  const {
    data: isInWishlist,
    isPending: isLoadingInWishlist,
    isError,
  } = useIsInWishlist({ productId: product.id });

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const { mutate: toggleWishlist } = useToggleWishList();

  const sizes: string[] | undefined = filter?.color
    ? product.colors
        .find((color) => color.colorName === filter.color)
        ?.variants.reduce((acc, cur) => [...acc, cur.size.name], [] as string[])
        .sort((a, b) => sizesOrdering[a] - sizesOrdering[b])
    : undefined;

  const maxValue: number | undefined =
    filter.color && filter.size
      ? product.colors
          .find((color) => color.colorName === filter.color)
          ?.variants.find((variant) => variant.size.name === filter.size)
          ?.quantity
      : undefined;

  const priceAdjustment =
    product.colors
      .find((color) => color.colorName === filter.color)
      ?.variants.find((variant) => variant.size.name === filter.size)
      ?.priceAdjustment || 0;

  const handleChangeQuantity = (val: number) => {
    setFilter((prev) => ({ ...prev, quantity: val }));
  };

  const handleIncreaseQuantity = () => {
    if (filter.quantity + 1 === maxValue) return;
    handleChangeQuantity(filter.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (filter.quantity - 1 === 0) return;
    handleChangeQuantity(filter.quantity - 1);
  };

  const handleToggleWishlist = () => {
    if (!user)
      return toast.error("You need to be logged in before you can add to cart");

    toggleWishlist({ productId: product.id });
  };

  const handleAddToCart = () => {
    if (!user)
      return toast.error("You need to be logged in before you can add to cart");

    const productVariant = product.colors
      .find((color) => color.colorName === filter.color)!
      .variants.find((variant) => variant.size.name === filter.size);

    addToCart({
      productVariantId: productVariant!.id,
      quantity: filter.quantity,
    });
  };

  return (
    <div className="flex flex-col items-start justify-between gap-y-7">
      <div className="w-full space-y-3 border-b border-zinc-200 pb-6">
        <p className="eyebrow">{product.category}</p>
        <div className="flex items-start justify-between gap-x-4">
          <h1 className="h2 max-w-[18rem]">{product.name}</h1>
          <InStock quantity={product.totalQuantity} />
        </div>
        <p className="space-x-2 text-xl font-semibold text-zinc-900">
          <span>${product.basePrice.toFixed(2)}</span>
          {priceAdjustment > 0 && <span>(+ ${priceAdjustment})</span>}
        </p>
      </div>

      {product.totalQuantity > 0 && (
        <div className="w-full space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
            Available colors
          </p>
          <div className="flex flex-wrap items-center gap-x-2">
            {product.colors.map((color) => (
              <div
                key={color.hexCode}
                onClick={() => {
                  setFilter((prev) => ({ ...prev, color: color.colorName }));
                }}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-200 ${color.colorName === filter?.color ? "border-2 border-zinc-900 shadow" : "border border-zinc-200 shadow-sm"}`}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{ backgroundColor: color.hexCode }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {sizes && sizes.length > 0 && (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">
              Select size
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="h-auto px-0 py-0 text-xs text-zinc-500"
                >
                  Size guide
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl border-zinc-200 bg-zinc-50">
                <DialogHeader>
                  <DialogTitle>Size guide</DialogTitle>
                  <DialogDescription>
                    Use your regular fit for daily wear, or size up for an
                    oversized silhouette.
                  </DialogDescription>
                </DialogHeader>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>XS / S: Slim fit and close-to-body cut</li>
                  <li>M / L: Regular fit for balanced styling</li>
                  <li>XL+: Relaxed fit for layered outfits</li>
                </ul>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sizes.map((size) => (
              <Button
                onClick={() => {
                  setFilter((prev) => ({ ...prev, size }));
                }}
                variant="ghost"
                key={size}
                className={`rounded-xl border px-3 py-2 uppercase ${size === filter.size ? "border-zinc-900 bg-zinc-900 text-zinc-50" : "border-zinc-300 bg-zinc-50 text-zinc-700"}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
      {sizes && !sizes.length && (
        <p className="body-1 text-zinc-600">
          This color is currently out of stock.
        </p>
      )}
      {sizes && sizes.length > 0 && maxValue && (
        <QuantitySelector
          value={filter.quantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          maxValue={maxValue}
        />
      )}

      {product.totalQuantity > 0 && (
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={handleAddToCart}
            disabled={
              !filter.size ||
              !filter.color ||
              !filter.quantity ||
              isAddingToCart
            }
            variant="primary"
            className="h-11 w-full sm:w-[15rem]"
          >
            Add to cart
          </Button>
          {!isLoadingInWishlist && (
            <Button
              disabled={!user || isError}
              variant="outline"
              onClick={handleToggleWishlist}
              className="h-11 w-full sm:w-auto"
            >
              <HeartIcon
                className={isInWishlist ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
          )}
        </div>
      )}

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
          <TabsTrigger className="text-xs md:text-sm" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="text-xs md:text-sm" value="shipping">
            Shipping
          </TabsTrigger>
          <TabsTrigger className="text-xs md:text-sm" value="returns">
            Returns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          Designed for all-day comfort with elevated styling cues and seasonal
          versatility.
        </TabsContent>
        <TabsContent value="shipping">
          Standard delivery in 3-5 business days. Express delivery options
          available at checkout.
        </TabsContent>
        <TabsContent value="returns">
          Returns accepted within 30 days in original condition with tags
          attached.
        </TabsContent>
      </Tabs>
    </div>
  );
}
