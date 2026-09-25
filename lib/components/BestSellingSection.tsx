import { IProducts } from "../features/products/types";
import ProductsContainer from "../features/products/components/ProductsContainer";

export default async function BestSellingSection({
  title,
  eyebrow,
  productsPromise,
}: {
  title: string;
  eyebrow: string;
  productsPromise: Promise<IProducts["products"]>;
}) {
  const products = await productsPromise;

  if (!products.length) return null;

  return (
    <section className="page-shell section-shell">
      <div className="section-heading flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2 mt-1">{title}</h2>
        </div>
      </div>
      <ProductsContainer products={products} />
    </section>
  );
}
