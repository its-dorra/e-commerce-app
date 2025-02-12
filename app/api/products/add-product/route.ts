import { uploadImage } from "@/server/cloudinary";
import { createProductFormDataSchema } from "@/server/schemas/products";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.formData();

  const data = createProductFormDataSchema.parse(body);

  const imagesToUpload: File[] = [];

  data.variants.forEach((variant) => {
    variant.images.forEach((image) => {
      imagesToUpload.push(image);
    });
  });

  const imageUrls = await Promise.all(
    imagesToUpload.map(async (image) => {
      return uploadImage(image);
    }),
  );

  // const product = {
  //   ...data,
  //   variants: data.variants.map((variant, index) => {
  //     return {
  //       ...variant,
  //       images: imageUrls.filter((_, i) => i === index),
  //     };
  //   }),
  // }

  return NextResponse.json({
    status: 200,
    body: {
      message: "Product added successfully",
      success: true,
      images: imageUrls,
    },
  });
};
