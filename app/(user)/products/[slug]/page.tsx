import ProductDetails from "@/lib/features/products/components/ProductDetails";
import ProductImagesSwiper from "@/lib/features/products/components/ProductImagesSwiper";
import { getProductById, getProducts } from "@/lib/features/products/services";
import env from "@/server/env";
import { notFound } from "next/navigation";
import ProductsContainer from "@/lib/features/products/components/ProductsContainer";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductById(Number(slug));

  if (!product) return notFound();

  return {
    title: `Fashion Haven | ${product.name}`,
    description: `Discover ${product.name} at Fashion Haven.`,
    openGraph: {
      title: `Fashion Haven | ${product.name}`,
      description: `Discover ${product.name} at Fashion Haven.`,
      url: `${env.BASE_URL}/products/${product.id}`,
      siteName: "Fashion Haven",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `Fashion Haven | ${product.name}`,
      description: `Discover ${product.name} at Fashion Haven.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductById(Number(slug));

  if (!product) return notFound();

  const related = await getProducts({
    categories: product.category,
    page: 1,
    perPage: 5,
  });

  const relatedProducts = related.products.filter(
    (item) => item.id !== product.id,
  );

  return (
    <main className="page-shell">
      <section className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-zinc-200/70 bg-zinc-50 p-4 shadow-sm md:p-6 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:p-8">
          <ProductImagesSwiper images={product.images} />
          <ProductDetails product={product} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-shell pt-0">
          <div className="section-heading">
            <p className="eyebrow">Related picks</p>
            <h2 className="h2">Complete the look</h2>
          </div>
          <ProductsContainer products={relatedProducts.slice(0, 4)} />
        </section>
      )}

      <section className="section-shell pt-0">
        <div className="section-muted p-6 md:p-8">
          <p className="eyebrow">Editorial note</p>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">
            This piece is part of our curated {product.category.toLowerCase()}{" "}
            collection, designed for versatile styling from daywear to
            after-hours looks.
          </p>
        </div>
      </section>
    </main>
  );
}
