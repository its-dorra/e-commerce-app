import { PER_PAGE } from "@/lib/constants/app-config";
import { MAX_FILE_SIZE } from "@/lib/utils";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const productQuerySchema = z.object({
  categories: z.string().array().or(z.string()).optional(),
  colors: z.string().array().or(z.string()).optional(),
  sizes: z
    .enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"])
    .array()
    .or(z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"]))
    .optional(),
  page: z.coerce.number().default(1),
  perPage: z.number().positive().default(PER_PAGE),
});

const sizeSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"]),
  priceAdjustment: zfd.numeric(
    z.number().min(0, "Put a valid price adjustment").default(0),
  ),
  quantity: zfd.numeric(z.number().min(1, "Put a valid quantity")),
  dimensions: zfd.text(z.string().optional()),
});

const productVariantSchema = z.object({
  colorName: zfd.text(z.string().min(1, "Put a valid color name")),
  sizes: zfd.repeatable(z.array(sizeSchema)),
  images: zfd.repeatable(
    z
      .array(
        zfd.file(
          z.custom<File>(
            (file) => {
              const isFileInstance = file instanceof File;
              if (!isFileInstance) return false;
              if (file.size >= MAX_FILE_SIZE) return false;
              const validTypes = ["image/jpg", "image/jpeg", "image/png"];
              return validTypes.includes(file.type);
            },
            {
              message:
                "Please upload valid images (.jpg, .jpeg, .png) under 5MB",
            },
          ),
        ),
      )
      .min(1, "Please upload at least one image"),
  ),
});

export const createProductFormDataSchema = zfd.formData({
  name: zfd.text(z.string().min(1, "Put a valid product name")),
  description: zfd.text(z.string().min(5, "Put a valid product description")),
  basePrice: zfd.numeric(z.number().min(1, "Put a valid price")),
  categoryName: zfd.text(z.string().min(1, "Put a valid category name")),
  variants: zfd.repeatable(z.array(productVariantSchema)),
});
