import { arrowRightIcon, landingPagePic } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mb-16 flex h-[430px] w-full items-center justify-around bg-secondaryWhite px-4 lg:h-auto lg:pt-12">
      <div className="flex flex-col items-start justify-center">
        <h1 className="h1">Fresh Arrivals Online</h1>
        <p className="body-2 text-black/60">
          Discover Our Newest Collection Today
        </p>
        <Link href="">
          <Button className="mt-10 flex items-center gap-1 rounded-sm bg-black text-white">
            <span>View Collection</span>
            <Image src={arrowRightIcon} alt="arrow right" />
          </Button>
        </Link>
      </div>
      <Image
        src={landingPagePic}
        alt="landing page picture"
        className="hidden place-self-end lg:block"
      />
    </section>
  );
}
