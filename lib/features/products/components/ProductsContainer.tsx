import Image, { StaticImageData } from "next/image";
import { Products } from "../../../constants";

interface ProductProps {
  picture: string;
  name: string;
  price: number;
  quantity: number;
}

function ProductItem({ name, price, quantity, picture }: ProductProps) {
  return (
    <div className="space-y-2">
      <div className="rouded-sm h-68 grid w-full place-items-center bg-secondaryWhite">
        <img className="h-full w-5/6" src={picture} alt={name} />
      </div>
      <p className="body-1">{name}</p>
      <div className="flex items-center gap-x-2">
        <p className="rounded-full border-[0.5px] px-2 py-1 uppercase">
          {quantity > 0 ? "in stock" : "out of stock"}
        </p>
        <p className="body-2 text-black/60">${price}.00</p>
      </div>
    </div>
  );
}

export default function ProductsContainer({
  products,
}: {
  products: Products;
}) {
  return (
    <div className="grid w-full grid-cols-[250px] justify-around gap-x-4 gap-y-8 md:grid-cols-[repeat(2,250px)] lg:grid-cols-[repeat(4,250px)]">
      {products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            picture={product.imageUrl}
            name={product.name}
            price={product.basePrice}
            quantity={product.quantity}
          />
        );
      })}
    </div>
  );
}
