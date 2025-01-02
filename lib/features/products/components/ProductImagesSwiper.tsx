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
    <Carousel>
      <CarouselContent className="w-[320px]">
        {images.map((image) => (
          <CarouselItem
            className="w-[320px]"
            key={image + Math.random().toString()}
          >
            <ProductImage imageUrl={image} alt="image product" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
