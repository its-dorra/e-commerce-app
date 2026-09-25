import { arrowRightIcon, upperWoman } from "@/assets";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function BrowseFashion() {
  return (
    <section className="page-shell section-shell">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-stone-50/70 p-7 md:p-9">
          <div className="section-heading mb-6">
            <p className="eyebrow">Curated Universe</p>
            <h2 className="h2 mt-1">Browse by Category</h2>
            <p className="font-body mt-2 max-w-xl text-sm font-light leading-relaxed text-stone-600 md:text-base">
              Explore timeless staples and statement pieces across tailored
              collections crafted for effortless sophistication.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.slice(0, 6).map(({ id, category }) => (
              <Link
                key={id}
                href={`/products/?categories=${category}`}
                className="font-body shadow-2xs hover:shadow-xs group flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-xs font-medium tracking-wide text-stone-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-700/60"
              >
                <span>{category}</span>
                <span className="text-stone-400 transition-colors group-hover:text-amber-700">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 p-8 text-stone-100 shadow-xl md:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-600/10 blur-2xl animate-glow-pulse" />

          <div className="relative z-10 max-w-sm space-y-5">
            <div className="inline-block rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-300">
              Limited Editorial Drop
            </div>
            <h3 className="font-display text-2xl font-normal leading-tight text-white md:text-3xl">
              Save up to 40% on elevated seasonal silhouettes.
            </h3>
            <p className="font-body text-sm font-light text-stone-300">
              Limited-edition capsule inspired by runway layering and daily
              ease.
            </p>
            <Link href="/products" className="inline-block pt-1">
              <Button variant="primary" size="default" className="font-medium">
                <span>Shop Promotion</span>
                <Image
                  src={arrowRightIcon}
                  alt="arrow right"
                  className="brightness-200 invert filter"
                />
              </Button>
            </Link>
          </div>

          <Image
            className="pointer-events-none absolute -bottom-3 right-0 hidden h-[90%] w-auto object-contain opacity-85 drop-shadow-2xl md:block"
            src={upperWoman}
            alt="fashion editorial model"
          />
        </div>
      </div>
    </section>
  );
}
