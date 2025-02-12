import { uploadImage } from "@/server/cloudinary";
import { addProduct } from "@/server/data-access/products";
import { createProductFormDataSchema } from "@/server/schemas/products";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.formData();

  const data = createProductFormDataSchema.parse(body);

  const imagesToUpload: { file: File; variantColor: string }[] = [];

  data.variants.forEach((variant) => {
    variant.images.forEach((image) => {
      imagesToUpload.push({ file: image, variantColor: variant.colorName });
    });
  });

  const imageUrls = await Promise.all(
    imagesToUpload.map(async (image) => {
      const url = await uploadImage(image.file);
      return { url, variantColor: image.variantColor };
    }),
  );

  const product = {
    ...data,
    variants: data.variants.map((variant) => {
      return {
        ...variant,
        images: imageUrls
          .filter((image) => image.variantColor === variant.colorName)
          .map((image) => image.url),
      };
    }),
  };

  const addedProduct = await addProduct(product);

  return NextResponse.json({
    status: 200,
    body: {
      message: "Product added successfully",
      success: true,
      product: addedProduct,
    },
  });
};
