import { arrowRightIcon, landingPagePic } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="page-shell section-shell">
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-gradient-to-br from-zinc-900 via-zinc-800 to-indigo-700 shadow-lg">
        <div className="grid items-center gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-14 lg:py-16">
          <div className="space-y-7 text-zinc-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Spring / Summer 2026
            </p>
            <h1 className="h1 max-w-xl">
              Crafted looks for the modern fashion pace.
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-zinc-200 md:text-base">
              Discover sharp silhouettes, premium textures, and limited drops
              curated to elevate your everyday wardrobe.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/products">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Shop collection</span>
                  <Image src={arrowRightIcon} alt="arrow right" />
                </Button>
              </Link>
              <Link href="/#about">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 sm:w-auto"
                >
                  Explore brand story
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden h-full min-h-[26rem] items-end justify-end rounded-3xl bg-zinc-100/10 p-4 lg:flex">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-zinc-900/25 to-transparent" />
            <Image
              src={landingPagePic}
              alt="Fashion model with latest collection"
              className="relative z-10 h-full max-h-[28rem] w-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
