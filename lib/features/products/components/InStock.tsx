export default function InStock({ quantity }: { quantity: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        quantity > 0
          ? "border border-emerald-300/60 bg-emerald-50/80 text-emerald-800"
          : "border border-stone-300 bg-stone-100 text-stone-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          quantity > 0 ? "animate-pulse bg-emerald-600" : "bg-stone-400"
        }`}
      />
      {quantity > 0 ? "In stock" : "Sold out"}
    </span>
  );
}
