import ProductDetails from "@/lib/features/products/components/ProductDetails";
import ProductImagesSwiper from "@/lib/features/products/components/ProductImagesSwiper";
import { getProductById } from "@/lib/features/products/services";
import { serverTrpc } from "@/lib/trpc/server";
import { baseUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

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
      url: `${baseUrl}/products/${product.id}`,
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

  await serverTrpc.products.productById.prefetch({ id: Number(slug) });

  return (
    <main className="container flex w-full grow flex-col items-center">
      <div className="flex w-full flex-col items-center gap-y-8 lg:max-w-4xl lg:flex-row lg:justify-center lg:gap-x-24">
        <ProductImagesSwiper images={product.images} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
