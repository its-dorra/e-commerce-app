"use client";

import { ProductDetails } from "@/server/data-access/products";
import InStock from "./InStock";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@/lib/providers/user-provider";
import toast from "react-hot-toast";
import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { useIsInWishlist } from "../../wishlist/hooks/useIsInWishlist";
import { HeartIcon } from "lucide-react";
import { useToggleWishList } from "../../wishlist/hooks/useToggleWishlist";

export default function ProductDetailsComponent ({ product }: { product: ProductDetails }) {
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
    : undefined;

  const maxValue: number | undefined =
    filter.color && filter.size
      ? product.colors
          .find((color) => color.colorName === filter.color)
          ?.variants.find((variant) => variant.size.name === filter.size)
          ?.quantity
      : undefined;

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
    <div className="flex flex-col items-start justify-between gap-y-8">
      <div className="flex items-center justify-between gap-x-4">
        <h3 className="h3">{product.name}</h3>
        <InStock quantity={product.totalQuantity} />
      </div>
      {product.totalQuantity > 0 && (
        <div className="space-y-2">
          <p className="body-2 uppercase text-gray-700">available colors</p>
          <div className="flex flex-wrap items-center gap-x-2">
            {product.colors.map((color) => (
              <div
                key={color.hexCode}
                onClick={() => {
                  setFilter((prev) => ({ ...prev, color: color.colorName }));
                }}
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-0.5 shadow-lg ${color.colorName === filter?.color ? "border-[1px] border-black" : ""}`}
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
        <div className="space-y-2">
          <p className="body-2 uppercase text-gray-500">select size</p>
          <div className="flex flex-wrap items-center gap-x-2">
            {sizes.map((size) => (
              <Button
                onClick={() => {
                  setFilter((prev) => ({ ...prev, size }));
                }}
                variant="ghost"
                key={size}
                className={`rounded-sm border p-2 uppercase ${size === filter.size ? "border-[4px]" : ""}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
      {sizes && !sizes.length && (
        <p className="body-1">This color is out of stock</p>
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
        <div className="flex items-center gap-x-3">
          <Button
            onClick={handleAddToCart}
            disabled={
              !filter.size ||
              !filter.color ||
              !filter.quantity ||
              isAddingToCart
            }
            className="w-[15rem]"
          >
            Add to cart
          </Button>
          {!isLoadingInWishlist && (
            <Button
              disabled={!user || isError}
              variant="outline"
              onClick={handleToggleWishlist}
            >
              <HeartIcon
                className={isInWishlist ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
