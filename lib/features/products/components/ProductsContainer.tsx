import Link from "next/link";
import { IProducts } from "../types";
import ProductImage from "./ProductImage";
import InStock from "./InStock";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ProductProps = IProducts["products"][number];

function ProductItem({
  id,
  name,
  basePrice,
  quantity,
  imageUrl,
}: ProductProps) {
  const isNew = id % 2 === 0;
  const hasSale = basePrice > 79;

  return (
    <Card className="group relative w-full overflow-hidden rounded-2xl border-zinc-200/70 bg-zinc-50/80 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        {isNew && <Badge variant="secondary">New</Badge>}
        {hasSale && <Badge variant="accent">Sale</Badge>}
      </div>

      <Link href={`/products/${id}`} className="block">
        <div className="space-y-4">
          <ProductImage
            imageUrl={imageUrl}
            alt={name}
            className="h-[240px] bg-zinc-100/80 transition-all duration-300 group-hover:shadow-md sm:h-[280px]"
            imageClassName="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />

          <div className="space-y-2 px-1 pb-2">
            <p className="line-clamp-2 text-base font-semibold text-zinc-800">
              {name}
            </p>
            <div className="flex items-center justify-between gap-x-2">
              <InStock quantity={quantity} />
              <p className="text-sm font-semibold text-zinc-600">
                ${basePrice}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-300 md:pointer-events-none md:translate-y-3 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <Link
          href={`/products/${id}`}
          className={cn(buttonVariants({ variant: "primary" }), "w-full")}
        >
          Shop now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

export default function ProductsContainer({
  products,
}: {
  products: IProducts["products"];
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            basePrice={product.basePrice}
            quantity={product.quantity}
            category={product.category}
          />
        );
      })}
    </div>
  );
}
