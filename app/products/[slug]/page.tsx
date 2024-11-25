import ProductDetails from "@/lib/features/products/components/ProductDetails";
import ProductImagesSwiper from "@/lib/features/products/components/ProductImagesSwiper";
import { getProductById } from "@/lib/features/products/services";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductById(slug);

  if (!product) return notFound();

  return (
    <main className="container space-y-8">
      <div className="flex flex-col items-center gap-y-8 lg:flex-row lg:justify-between">
        <ProductImagesSwiper images={product.images} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
