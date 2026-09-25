import { arrowRightIcon, landingPagePic } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="page-shell section-shell pt-2 md:pt-4">
      <div className="relative overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800 shadow-xl">
        {/* Subtle gold radiance aura in background */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl animate-glow-pulse" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-700/5 blur-2xl animate-glow-pulse delay-300" />

        <div className="relative z-10 grid items-center gap-10 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-16 lg:py-20">
          <div className="space-y-8 text-stone-100">
            <div className="inline-flex items-center gap-2 border-l-2 border-amber-600 pl-3 animate-fade-up">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Spring / Summer 2026
              </span>
            </div>

            <h1 className="font-display text-4xl font-normal leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up delay-75">
              Crafted looks for the modern fashion pace.
            </h1>

            <p className="font-body max-w-lg text-sm font-light leading-relaxed text-stone-300 md:text-base animate-fade-up delay-150">
              Discover sharp silhouettes, tactile natural fabrics, and limited
              drops curated to bring understated luxury to your daily rotation.
            </p>

            <div className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center animate-fade-up delay-225">
              <Link href="/products" prefetch>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-medium sm:w-auto"
                >
                  <span>Shop Collection</span>
                  <Image
                    src={arrowRightIcon}
                    alt="arrow right"
                    className="brightness-200 invert filter"
                  />
                </Button>
              </Link>
              <Link href="/#about">
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-xs w-full border-stone-700/80 bg-stone-900/60 text-stone-200 hover:border-stone-500 hover:bg-stone-800 hover:text-white sm:w-auto"
                >
                  Explore Maison
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden h-full min-h-[28rem] items-end justify-center rounded-2xl bg-gradient-to-t from-stone-900/40 via-stone-800/10 to-transparent p-4 animate-fade-in delay-150 lg:flex">
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            <Image
              src={landingPagePic}
              alt="Fashion model showcasing latest collection"
              className="relative z-10 h-full max-h-[30rem] w-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
