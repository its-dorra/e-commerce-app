"use client";

import ProductImage from "./ProductImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductImagesSwiper({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full max-w-[32rem]">
      <CarouselContent className="ml-0">
        {images.map((image) => (
          <CarouselItem className="pl-0" key={image + Math.random().toString()}>
            <ProductImage
              imageUrl={image}
              alt="image product"
              className="h-[22rem] bg-zinc-100/80 md:h-[30rem]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="backdrop-blur-xs left-3 hidden h-9 w-9 rounded-full border border-stone-200/90 bg-white/90 text-stone-800 shadow-sm transition-colors hover:border-amber-700 hover:text-amber-800 md:flex" />
      <CarouselNext className="backdrop-blur-xs right-3 hidden h-9 w-9 rounded-full border border-stone-200/90 bg-white/90 text-stone-800 shadow-sm transition-colors hover:border-amber-700 hover:text-amber-800 md:flex" />
    </Carousel>
  );
}
