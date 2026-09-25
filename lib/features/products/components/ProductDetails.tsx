"use client";

import { ProductDetails } from "@/server/data-access/products";
import InStock from "./InStock";
import { useState, useOptimistic, useTransition } from "react";
import QuantitySelector from "./QuantitySelector";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/providers/user-provider";
import toast from "react-hot-toast";
import { HeartIcon } from "lucide-react";
import { addCartItemAction } from "@/server/actions/cart";
import { toggleWishlistItemAction } from "@/server/actions/wishlist";
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
  initialIsInWishlist = false,
}: {
  product: ProductDetails;
  initialIsInWishlist?: boolean;
}) {
  const [filter, setFilter] = useState<{
    color?: string;
    size?: string;
    quantity: number;
  }>({ quantity: 1 });

  const { user } = useUser();

  const [optimisticIsInWishlist, setOptimisticIsInWishlist] = useOptimistic(
    initialIsInWishlist,
    (_, next: boolean) => next,
  );
  const [isTogglingWishlist, startWishlistTransition] = useTransition();
  const [isAddingToCart, startAddToCartTransition] = useTransition();

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
    if (!user) {
      return toast.error("You need to be logged in to manage your wishlist");
    }

    const nextState = !optimisticIsInWishlist;
    startWishlistTransition(async () => {
      setOptimisticIsInWishlist(nextState);
      const res = await toggleWishlistItemAction({ productId: product.id });
      if (res?.serverError) {
        toast.error(res.serverError);
      } else {
        toast.success("Wishlist updated!");
      }
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      return toast.error("You need to be logged in before you can add to cart");
    }

    const productVariant = product.colors
      .find((color) => color.colorName === filter.color)!
      .variants.find((variant) => variant.size.name === filter.size);

    if (productVariant) {
      startAddToCartTransition(async () => {
        const res = await addCartItemAction({
          productVariantId: productVariant.id,
          quantity: filter.quantity,
        });
        if (res?.serverError) {
          toast.error(res.serverError);
        } else {
          toast.success("Added to cart!");
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-y-7">
      <div className="w-full space-y-3.5 border-b border-stone-200/80 pb-6">
        <p className="eyebrow">{product.category}</p>
        <div className="flex items-start justify-between gap-x-4">
          <h1 className="font-display text-2xl font-normal tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <InStock quantity={product.totalQuantity} />
        </div>
        <p className="flex items-baseline gap-2 font-body text-2xl font-semibold tracking-tight text-stone-900">
          <span>${product.basePrice.toFixed(2)}</span>
          {priceAdjustment > 0 && (
            <span className="font-body text-sm font-normal text-amber-700">
              (+${priceAdjustment.toFixed(2)})
            </span>
          )}
        </p>
      </div>

      {product.totalQuantity > 0 && (
        <div className="w-full space-y-3">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-600">
            Available Colors
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.hexCode}
                type="button"
                onClick={() => {
                  setFilter((prev) => ({ ...prev, color: color.colorName }));
                }}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-200 ${
                  color.colorName === filter?.color
                    ? "scale-105 ring-2 ring-amber-700 ring-offset-2"
                    : "border border-stone-300 hover:scale-105"
                }`}
                title={color.colorName}
              >
                <div
                  className="h-full w-full rounded-full shadow-inner"
                  style={{ backgroundColor: color.hexCode }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && (
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-600">
              Select Size
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="h-auto p-0 font-body text-xs text-stone-500 hover:text-amber-800"
                >
                  Size guide
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl border-stone-200 bg-white">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    Size Guide
                  </DialogTitle>
                  <DialogDescription className="font-body text-xs">
                    Choose your regular fit for everyday elegance, or size up
                    for an oversized silhouette.
                  </DialogDescription>
                </DialogHeader>
                <ul className="space-y-2 font-body text-xs text-stone-600">
                  <li>
                    <strong className="text-stone-900">XS / S:</strong> Slim
                    tailored silhouette
                  </li>
                  <li>
                    <strong className="text-stone-900">M / L:</strong> Regular
                    effortless drape
                  </li>
                  <li>
                    <strong className="text-stone-900">XL+:</strong> Relaxed
                    contemporary cut
                  </li>
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
                className={`h-10 min-w-10 rounded-lg border font-body text-xs font-medium uppercase transition-colors ${
                  size === filter.size
                    ? "border-stone-900 bg-stone-900 text-stone-50 hover:bg-stone-900 hover:text-stone-50"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {sizes && !sizes.length && (
        <p className="font-body text-xs text-stone-500">
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
            className="h-11 w-full font-medium sm:w-[15rem]"
          >
            Add to Cart
          </Button>
          <Button
            disabled={!user || isTogglingWishlist}
            variant="outline"
            onClick={handleToggleWishlist}
            className="h-11 w-full sm:w-auto"
          >
            <HeartIcon
              className={
                optimisticIsInWishlist
                  ? "fill-amber-700 text-amber-700"
                  : "text-stone-600"
              }
            />
          </Button>
        </div>
      )}

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid h-10 w-full grid-cols-3 gap-1 rounded-xl bg-stone-100 p-1">
          <TabsTrigger className="font-body text-xs" value="details">
            Details
          </TabsTrigger>
          <TabsTrigger className="font-body text-xs" value="shipping">
            Shipping
          </TabsTrigger>
          <TabsTrigger className="font-body text-xs" value="returns">
            Returns
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="details"
          className="font-body text-xs leading-relaxed text-stone-600"
        >
          Designed for longevity and elevated comfort, featuring clean
          finishings and premium construction.
        </TabsContent>
        <TabsContent
          value="shipping"
          className="font-body text-xs leading-relaxed text-stone-600"
        >
          Standard complimentary delivery in 3–5 business days. Express next-day
          shipping available at checkout.
        </TabsContent>
        <TabsContent
          value="returns"
          className="font-body text-xs leading-relaxed text-stone-600"
        >
          Returns accepted within 30 days in original packaging with unbroken
          garment tags.
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between gap-y-7">
      <div className="w-full space-y-3.5 border-b border-stone-200/80 pb-6">
        <div className="h-4 w-24 animate-pulse rounded bg-stone-100" />
        <div className="flex items-start justify-between gap-x-4">
          <div className="h-9 w-3/4 animate-pulse rounded-lg bg-stone-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-stone-100" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded-md bg-stone-100" />
      </div>

      <div className="w-full space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-stone-100" />
        <div className="flex gap-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="size-8 animate-pulse rounded-full bg-stone-100"
            />
          ))}
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="h-3 w-24 animate-pulse rounded bg-stone-100" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-10 animate-pulse rounded-lg bg-stone-100"
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
        <div className="h-11 w-full animate-pulse rounded-xl bg-stone-100 sm:w-[15rem]" />
        <div className="h-11 w-12 animate-pulse rounded-xl bg-stone-100" />
      </div>
    </div>
  );
}
