"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface AddProductDialogProps {
  isOpen: boolean;
  toggleDialog: (isOpen: boolean) => void;
}

export default function AddProductDialog({
  isOpen,
  toggleDialog,
}: AddProductDialogProps) {
  const form = useForm<z.infer<typeof createProductSchema>, ZodValidator>({
    defaultValues: {
      name: "",
      basePrice: 0,
      description: "",
      categoryName: "",
      variants: [],
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createProductSchema,
    },
    onSubmit: ({ value }) => {},
  });

  const { data: sizes, isPending: isGettingSizes } = useSizes();

  const { data: colors, isPending: isGettingColors } = useColors();

  const { data: categories, isPending: isGettingCategories } = useCategories();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="py-10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new product</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-y-8" onSubmit={onSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <form.Field name="name">
                {(field) => (
                  <FormField
                    name={field.name}
                    field={field}
                    label="Product name"
                  />
                )}
              </form.Field>
              <form.Field name="description">
                {(field) => (
                  <FormField
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
              <CardTitle className="text-lg">
                Colors, Sizes, and Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form.Field name="variants" mode="array">
                {(field) => (
                  <div className="flex flex-col gap-4">
                    {field.state.value.map((_, variantIndex) => {
                      return (
                        <form.Field
                          key={variantIndex}
                          name={`variants[${variantIndex}].sizes`}
                          mode="array"
                        >
                          {(field) => (
                            <>
                              {field.state.value.map((_, sizeIndex) => (
                                <div className="flex flex-col gap-4">
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
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            {sizes?.map((size) => (
                                              <SelectItem
                                                key={size}
                                                value={size}
                                              >
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
                                        label="Quantity"
                                        placeholder="Quantity"
                                        field={field}
                                        name={field.name}
                                      />
                                    )}
                                  </form.Field>
                                </div>
                              ))}
                              <Button
                                className="w-fit"
                                type="button"
                                onClick={() => {
                                  field.pushValue({
                                    priceAdjustment: 0,
                                    quantity: 0,
                                    size: "S",
                                  });
                                }}
                                variant="outline"
                              >
                                Add Size
                              </Button>
                            </>
                          )}
                        </form.Field>
                      );
                    })}

                    <Button
                      className="w-fit"
                      type="button"
                      onClick={() => {
                        field.pushValue({
                          colorName: "",
                          images: [],
                          sizes: [],
                        });
                      }}
                      variant="outline"
                    >
                      Add product variant
                    </Button>
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
