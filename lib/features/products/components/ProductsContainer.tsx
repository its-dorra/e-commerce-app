import Link from "next/link";
import { IProducts } from "../types";
import ProductImage from "./ProductImage";
import InStock from "./InStock";
import { Button } from "@/components/ui/button";

type ProductProps = IProducts["products"][number];

function ProductItem({
  id,
  name,
  basePrice,
  quantity,
  imageUrl,
}: ProductProps) {
  return (
    <Button variant="ghost" className="h-fit w-fit">
      <Link href={`/products/${id}`}>
        <div className="flex w-[250px] flex-col items-start space-y-2">
          <ProductImage imageUrl={imageUrl} alt={name} />
          <p className="body-1">{name}</p>
          <div className="flex items-center gap-x-2">
            <InStock quantity={quantity} />
            <p className="body-2 text-black/60">${basePrice}</p>
          </div>
        </div>
      </Link>
    </Button>
  );
}

export default function ProductsContainer({
  products,
}: {
  products: IProducts["products"];
}) {
  return (
    <div className="flex w-full flex-wrap gap-x-8 gap-y-12">
      {products.map((product) => {
        if (product.imageUrl.length === 0) return <></>;
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
