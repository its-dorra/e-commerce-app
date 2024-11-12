import { ProductDetails } from "@/server/data-access/products";

export default function ({ product }: { product: ProductDetails }) {
  return (
    <div className="flex h-[420px] flex-col items-start justify-between">
      <div className="flex items-center justify-between">
        <h3 className="h3">{product?.name}</h3>
      </div>
    </div>
  );
}
