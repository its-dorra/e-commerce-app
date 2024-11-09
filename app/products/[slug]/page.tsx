export default function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <main>{slug}</main>;
}
