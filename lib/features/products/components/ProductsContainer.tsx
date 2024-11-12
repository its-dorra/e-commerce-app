import Link from "next/link";
import { IProducts } from "../types";
import ProductImage from "./ProductImage";
import InStock from "./InStock";

type ProductProps = IProducts["products"][number];

function ProductItem({
  id,
  name,
  basePrice,
  quantity,
  imageUrl,
}: ProductProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="w-[250px] space-y-2">
        <ProductImage imageUrl={imageUrl} alt={name} />
        <p className="body-1">{name}</p>
        <div className="flex items-center gap-x-2">
          <InStock quantity={quantity} />
          <p className="body-2 text-black/60">${basePrice}.00</p>
        </div>
      </div>
    </Link>
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
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            basePrice={product.basePrice}
            quantity={product.quantity}
          />
        );
      })}
    </div>
  );
}
