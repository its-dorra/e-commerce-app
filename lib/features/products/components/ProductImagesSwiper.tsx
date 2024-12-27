"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductImage from "./ProductImage";

export default function ProductImagesSwiper({ images }: { images: string[] }) {
  return (
    <Swiper className="!mx-0 w-[250px]" spaceBetween={50} slidesPerView={1}>
      {images.map((image) => (
        <SwiperSlide key={image}>
          <ProductImage imageUrl={image} alt="image product" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
