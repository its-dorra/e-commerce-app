"use client";

import { ProductDetails } from "@/server/data-access/products";
import InStock from "./InStock";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { heartIcon } from "@/assets";

export default function ({ product }: { product: ProductDetails }) {
  const [filter, setFilter] = useState<{
    color?: string;
    size?: string;
    quantity: number;
  }>({ quantity: 1 });

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
          setValue={handleChangeQuantity}
          maxValue={maxValue}
        />
      )}

      {product.totalQuantity > 0 &&   (
        <div className="flex items-center gap-x-3">
          <Button disabled={!filter.size && !filter.color && !filter.quantity} className="w-[15rem]">Add to cart</Button>
          <Button variant="outline">
            <Image src={heartIcon} alt="heart icon" />
          </Button>
        </div>
      )}
    </div>
  );
}
