export default function InStock({ quantity }: { quantity: number }) {
  return (
    <p className="rounded-full border-[0.5px] px-2 py-1 text-[12px] uppercase">
      {quantity > 0 ? "in stock" : "out of stock"}
    </p>
  );
}
