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
      <div className="section-muted px-5 py-10 md:px-8 lg:px-10">
        <div className="section-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2">{title}</h2>
        </div>
        <ProductsContainer products={products} />
      </div>
    </section>
  );
}
