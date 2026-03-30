export default function InStock({ quantity }: { quantity: number }) {
  return (
    <p
      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
        quantity > 0
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-zinc-300 bg-zinc-100 text-zinc-500"
      }`}
    >
      {quantity > 0 ? "in stock" : "out of stock"}
    </p>
  );
}
