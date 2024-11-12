import { getProductById } from "@/lib/features/products/services";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductById(slug);

  if (!product) return notFound();

  return <main>{slug}</main>;
}
