import ProductDetails, {
  ProductDetailsSkeleton,
} from "@/lib/features/products/components/ProductDetails";
import ProductImagesSwiper from "@/lib/features/products/components/ProductImagesSwiper";
import { getProductById, getProducts } from "@/lib/features/products/services";
import env from "@/server/env";
import { notFound } from "next/navigation";
import ProductsContainer from "@/lib/features/products/components/ProductsContainer";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { isProductInWishList } from "@/server/data-access/wishlist";
import type { ProductDetails as ProductDetailsType } from "@/server/data-access/products";

export const prefetch = "partial";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const product = await getProductById(slug);

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
      type: "website",
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

  const product = await getProductById(slug);

  if (!product) return notFound();

  return (
    <main className="page-shell">
      <section className="section-shell">
        <div className="grid gap-8 rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:p-10">
          <ProductImagesSwiper images={product.images} />
          <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetailsSection product={product} />
          </Suspense>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="section-shell pt-0">
            <div className="h-48 w-full animate-pulse rounded-2xl bg-stone-100" />
          </div>
        }
      >
        <RelatedProducts productId={product.id} category={product.category} />
      </Suspense>

      <section className="section-shell pt-0">
        <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-6 md:p-8">
          <p className="eyebrow">Maison Note</p>
          <p className="mt-2.5 max-w-2xl font-body text-xs font-light leading-relaxed text-stone-600 md:text-sm">
            This piece is an intentional component of our curated{" "}
            {product.category.toLowerCase()} collection, meticulously designed
            for versatile styling from daywear to after-hours occasions.
          </p>
        </div>
      </section>
    </main>
  );
}

async function RelatedProducts({
  productId,
  category,
}: {
  productId: string;
  category: string;
}) {
  const related = await getProducts({
    categories: category,
    page: 1,
    perPage: 5,
  });

  const relatedProducts = related.products.filter(
    (item) => item.id !== productId,
  );

  if (relatedProducts.length === 0) return null;

  return (
    <section className="section-shell pt-0">
      <div className="section-heading">
        <p className="eyebrow">Related picks</p>
        <h2 className="h2">Complete the look</h2>
      </div>
      <ProductsContainer products={relatedProducts.slice(0, 4)} />
    </section>
  );
}

async function ProductDetailsSection({
  product,
}: {
  product: ProductDetailsType;
}) {
  const user = await getCurrentUser();
  const inWishlist = user
    ? await isProductInWishList({ productId: product.id, userId: user.id })
    : false;

  return <ProductDetails product={product} initialIsInWishlist={inWishlist} />;
}
