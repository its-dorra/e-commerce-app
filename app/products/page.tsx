import FilteringProducts from "@/lib/features/products/components/FilteringProducts";

export default function ProductsListing() {
  return (
    <main className="container grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <FilteringProducts />
    </main>
  );
}
