import { bestSelling } from "../constants";
import ProductItem from "./ProductItem";
import ProductsContainer from "../features/products/components/ProductsContainer";

export default function BestSellingSection() {
  return (
    <section className="container mx-auto space-y-8 py-16">
      <div className="space-y-2">
        <p className="body-1 text-center uppercase text-black/60">shop now</p>
        <h2 className="h2 text-center">Best Selling</h2>
      </div>
      <ProductsContainer products={bestSelling} />
    </section>
  );
}
