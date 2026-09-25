import { PER_PAGE } from "@/lib/constants/app-config";
import { checkFileType, MAX_FILE_SIZE } from "@/lib/utils";
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

export const createSizeSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"]),
  priceAdjustment: z.number().min(0, "Put a valid price adjustment"),
  quantity: z.number().min(1, "Put a valid quantity"),
  dimensions: z.string().optional(),
});

export const createProductVariantSchema = z.object({
  colorName: z.string().min(1, "Put a valid color name"),
  sizes: z.array(createSizeSchema),
  images: z
    .array(
      z.custom<File>(
        (file) => {
          const isFileInstance = file instanceof File;
          if (!isFileInstance) return false;
          if (file.size >= MAX_FILE_SIZE) return false;
          const validTypes = ["image/jpg", "image/jpeg", "image/png"];
          return checkFileType(file, validTypes);
        },
        {
          message: "Please upload valid images (.jpg, .jpeg, .png) under 5MB",
        },
      ),
    )
    .min(1, "Please upload at least one image"),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Put a valid product name"),
  description: z.string().min(5, "Put a valid product description"),
  basePrice: z.number().min(1, "Put a valid price"),
  categoryName: z.string().min(1, "Put a valid category name"),
  variants: z.array(createProductVariantSchema),
});

const sizeFormDataSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "2XL", "3XL"]),
  priceAdjustment: zfd.numeric(
    z.number().min(0, "Put a valid price adjustment").default(0),
  ),
  quantity: zfd.numeric(z.number().min(1, "Put a valid quantity")),
  dimensions: zfd.text(z.string().optional()),
});

const productVariantFormDataSchema = z.object({
  colorName: zfd.text(z.string().min(1, "Put a valid color name")),
  sizes: zfd.repeatable(z.array(sizeFormDataSchema)),
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
              return checkFileType(file, validTypes);
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
  variants: zfd.repeatable(z.array(productVariantFormDataSchema)),
});
