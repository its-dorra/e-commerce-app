import { arrowRightIcon, upperWoman } from "@/assets";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function BrowseFashion() {
  return (
    <section className="page-shell section-shell">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="section-muted p-6 md:p-8">
          <div className="section-heading">
            <p className="eyebrow">Shop by category</p>
            <h2 className="h2">Browse your fashion universe.</h2>
            <p className="max-w-xl text-sm text-zinc-600 md:text-base">
              Explore staples and statement pieces across curated categories,
              tailored for every season and every moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.slice(0, 6).map(({ id, category }) => (
              <Link
                key={id}
                href={`/products/?categories=${category}`}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-gradient-to-br from-indigo-500 via-indigo-600 to-zinc-900 p-8 text-zinc-50 shadow-lg">
          <div className="relative z-10 max-w-xs space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-100">
              Editorial Drop
            </p>
            <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
              Save up to 40% on elevated streetwear edits.
            </h3>
            <p className="text-sm text-indigo-100/90">
              Limited-time campaign inspired by runway layering and everyday
              ease.
            </p>
            <Link href="/products">
              <Button className="bg-zinc-50 text-zinc-900 hover:bg-zinc-200">
                Shop promotion
                <Image src={arrowRightIcon} alt="arrow right" />
              </Button>
            </Link>
          </div>

          <Image
            className="pointer-events-none absolute -bottom-3 right-0 hidden h-[85%] w-auto object-contain opacity-90 md:block"
            src={upperWoman}
            alt="fashion editorial model"
          />
        </div>
      </div>
    </section>
  );
}
