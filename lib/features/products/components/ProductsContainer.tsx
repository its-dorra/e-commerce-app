import Link from "next/link";
import { IProducts } from "../types";
import ProductImage from "./ProductImage";
import InStock from "./InStock";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ProductProps = IProducts["products"][number] & { index?: number };

const delayClasses = ["", "delay-75", "delay-150", "delay-225"];

function ProductItem({
  id,
  name,
  basePrice,
  quantity,
  imageUrl,
  index = 0,
}: ProductProps) {
  const isNew = index % 2 === 0;
  const hasSale = basePrice > 79;
  const delayClass = delayClasses[index % 4];

  return (
    <div
      className={cn(
        "shadow-2xs group relative flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-3.5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-stone-300 hover:shadow-lg",
        delayClass,
      )}
    >
      <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5">
        {isNew && <Badge variant="secondary">New</Badge>}
        {hasSale && <Badge variant="accent">Sale</Badge>}
      </div>

      <Link href={`/products/${id}`} className="block overflow-hidden" prefetch>
        <div className="space-y-4">
          <ProductImage
            imageUrl={imageUrl}
            alt={name}
            className="h-[250px] bg-stone-100 sm:h-[290px]"
            imageClassName="group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />

          <div className="space-y-2 px-1 pb-2">
            <h3 className="line-clamp-1 font-display text-lg font-medium text-stone-900 transition-colors duration-200 group-hover:text-amber-800">
              {name}
            </h3>
            <div className="flex items-center justify-between gap-x-2">
              <InStock quantity={quantity} />
              <p className="font-body text-sm font-semibold tracking-tight text-stone-800">
                ${basePrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-1 transition-all duration-300 md:pointer-events-none md:mt-0 md:translate-y-1 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <Link
          href={`/products/${id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "w-full justify-between font-body text-xs transition-colors",
          )}
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function ProductsContainer({
  products,
}: {
  products: IProducts["products"];
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            basePrice={product.basePrice}
            quantity={product.quantity}
            category={product.category}
            index={index}
          />
        );
      })}
    </div>
  );
}
