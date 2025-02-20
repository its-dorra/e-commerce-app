"use client";

import { serialize } from "object-to-formdata";

import { createProductSchema } from "@/server/db/schema/products";
import { useForm } from "@tanstack/react-form";
import { zodValidator, ZodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import {
  useCategories,
  useColors,
  useSizes,
} from "../../products/hooks/useFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "@/lib/components/FormField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Size } from "@/server/types/products";
import FileUploader from "./file-uploader";
import { useAddProduct } from "../hooks/useAddProduct";
import { Minus } from "lucide-react";

function objectToFormData(
  obj: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey: string = "",
): FormData {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File) {
        // Handle File objects
        formData.append(formKey, value);
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          const arrayKey = `${formKey}[${index}]`;
          if (item instanceof File || typeof item !== "object") {
            formData.append(arrayKey, item);
          } else {
            objectToFormData(item, formData, arrayKey);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects
        objectToFormData(value, formData, formKey);
      } else {
        // Handle primitive values (string, number, boolean)
        formData.append(formKey, value);
      }
    }
  }
  return formData;
}

interface AddProductContainerProps {}

export default function AddProductContainer({}: AddProductContainerProps) {
  const { data, addProduct, isLoading: isAddingProduct } = useAddProduct();

  const form = useForm<z.infer<typeof createProductSchema>, ZodValidator>({
    defaultValues: {
      name: "",
      basePrice: 0,
      description: "",
      categoryName: "",
      variants: [
        {
          colorName: "",
          images: [] as File[],
          sizes: [{ size: "S", priceAdjustment: 0, quantity: 1 }],
        },
      ],
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createProductSchema,
    },
    onSubmit: ({ value }) => {
      const formData = objectToFormData(value);

      addProduct(formData);
    },
  });

  const { data: sizes } = useSizes();

  const { data: colors, isPending: isGettingColors } = useColors();

  const { data: categories, isPending: isGettingCategories } = useCategories();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form.Field name="name">
            {(field) => (
              <FormField
                inputType="text"
                name={field.name}
                field={field}
                label="Product name"
              />
            )}
          </form.Field>
          <form.Field name="description">
            {(field) => (
              <FormField
                inputType="text"
                name={field.name}
                type="textArea"
                field={field}
                label="Description"
              />
            )}
          </form.Field>
          <form.Field name="categoryName">
            {(field) => (
              <Select
                name={field.name}
                value={field.state.value}
                disabled={isGettingCategories}
                onValueChange={field.handleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </form.Field>
          <form.Field name="basePrice">
            {(field) => (
              <FormField
                inputType="number"
                name={field.name}
                field={field}
                label="Base price"
              />
            )}
          </form.Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colors, Sizes, and Images</CardTitle>
        </CardHeader>
        <CardContent>
          <form.Field name="variants" mode="array">
            {(variantsField) => (
              <div className="flex flex-col gap-4">
                {variantsField.state.value.map((_, variantIndex) => {
                  return (
                    <form.Field
                      key={`variant-${variantIndex}`}
                      name={`variants[${variantIndex}].sizes`}
                      mode="array"
                    >
                      {(field) => (
                        <div className="relative flex flex-col gap-4 rounded border p-4">
                          <div className="flex items-center gap-3">
                            <form.Field
                              name={`variants[${variantIndex}].colorName`}
                            >
                              {(field) => (
                                <Select
                                  name={field.name}
                                  value={field.state.value}
                                  disabled={isGettingColors}
                                  onValueChange={field.handleChange}
                                >
                                  <SelectTrigger className="w-full focus:ring-0">
                                    <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {colors?.map((color) => (
                                        <SelectItem
                                          key={color.hexCode}
                                          value={color.name}
                                        >
                                          <div className="grid grid-flow-row grid-cols-[10ch_1fr] items-center">
                                            <span className="grow">
                                              {color.name}
                                            </span>
                                            <div
                                              className="h-4 w-8 rounded-lg border shadow-md"
                                              style={{
                                                backgroundColor: color.hexCode,
                                              }}
                                            />
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            </form.Field>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="aspect-square w-fit"
                              onClick={() => {
                                if (variantsField.state.value.length === 1)
                                  return;
                                variantsField.removeValue(variantIndex);
                              }}
                            >
                              <Minus className="size-2" />
                            </Button>
                          </div>
                          {field.state.value.map((_, sizeIndex) => (
                            <div
                              className="flex items-start justify-between gap-8"
                              key={`size-${sizeIndex}`}
                            >
                              <form.Field
                                name={`variants[${variantIndex}].sizes[${sizeIndex}].size`}
                              >
                                {(field) => (
                                  <Select
                                    name={field.name}
                                    value={field.state.value}
                                    disabled={isGettingCategories}
                                    onValueChange={(value: Size) =>
                                      field.handleChange(value)
                                    }
                                  >
                                    <SelectTrigger className="w-full focus:ring-0">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {sizes?.map((size) => (
                                          <SelectItem key={size} value={size}>
                                            {size}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              </form.Field>
                              <form.Field
                                name={`variants[${variantIndex}].sizes[${sizeIndex}].quantity`}
                              >
                                {(field) => (
                                  <FormField
                                    inputType="number"
                                    withLabel={false}
                                    label="Quantity"
                                    placeholder="Quantity"
                                    field={field}
                                    name={field.name}
                                  />
                                )}
                              </form.Field>
                              <form.Field
                                name={`variants[${variantIndex}].sizes[${sizeIndex}].priceAdjustment`}
                              >
                                {(field) => (
                                  <FormField
                                    inputType="number"
                                    withLabel={false}
                                    label="Price adjustment"
                                    field={field}
                                    name={field.name}
                                    type="input"
                                    placeholder="Price adjustment"
                                  />
                                )}
                              </form.Field>
                              <Button
                                variant="destructive"
                                className="aspect-square w-fit p-0.5"
                                size="icon"
                                onClick={() => {
                                  if (field.state.value.length === 1) return;
                                  field.removeValue(sizeIndex);
                                }}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            className="mt-2 w-fit"
                            type="button"
                            onClick={() => {
                              field.pushValue({
                                priceAdjustment: 0,
                                quantity: 1,
                                size: "S",
                              });
                            }}
                            variant="outline"
                          >
                            Add Size
                          </Button>
                          <div className="space-y-2">
                            <p>Images</p>
                            <form.Field
                              name={`variants[${variantIndex}].images`}
                            >
                              {(field) => (
                                <FileUploader
                                  accept="image/jpeg, image/jpg, image/png"
                                  multiple
                                  uploadedImages={field.state.value}
                                  onChange={(e) =>
                                    field.handleChange(
                                      Array.from(e.target.files || []),
                                    )
                                  }
                                  onRemove={(file) => {
                                    field.handleChange((value) =>
                                      value.filter((image) => image !== file),
                                    );
                                  }}
                                />
                              )}
                            </form.Field>
                          </div>
                        </div>
                      )}
                    </form.Field>
                  );
                })}

                <Button
                  className="w-fit"
                  type="button"
                  onClick={() => {
                    variantsField.pushValue({
                      colorName: "",
                      images: [],
                      sizes: [
                        {
                          size: "S",
                          priceAdjustment: 0,
                          quantity: 1,
                        },
                      ],
                    });
                  }}
                  variant="outline"
                >
                  Add product variant
                </Button>
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                className="mt-4 w-full"
                type="submit"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </form>
  );
}
