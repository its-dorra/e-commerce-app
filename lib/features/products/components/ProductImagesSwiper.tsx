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
      <CarouselPrevious className="left-3 hidden border-zinc-200 bg-zinc-50 md:flex" />
      <CarouselNext className="right-3 hidden border-zinc-200 bg-zinc-50 md:flex" />
    </Carousel>
  );
}
