import Link from "next/link";
import { IProducts } from "../types";

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
        <div className="rouded-sm h-68 grid w-full place-items-center bg-secondaryWhite">
          <img className="h-full w-5/6" src={imageUrl} alt={name} />
        </div>
        <p className="body-1">{name}</p>
        <div className="flex items-center gap-x-2">
          <p className="rounded-full border-[0.5px] px-2 py-1 uppercase">
            {quantity > 0 ? "in stock" : "out of stock"}
          </p>
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
