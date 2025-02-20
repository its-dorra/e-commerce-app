"use client";

import EmptyListMessage from "@/lib/components/EmptyListMessage";
import { useCart } from "../../cart/hooks/useCart";
import { useAddress } from "../../address/hooks/useAddress";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/lib/components/LoadingSpinner";

import { useCreateOrder } from "../../orders/hooks/useCreateOrder";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { insertAddressSchema } from "@/server/db/schema/address";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import FormField from "@/lib/components/FormField";

const checkOutShippingInformation = insertAddressSchema.merge(
  z.object({
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be exactly 10 digits" })
      .max(10, { message: "Phone number must be exactly 10 digits" }),
  }),
);

export default function CheckoutContainer() {
  const { data: cartData, isPending: isGettingCart } = useCart();

  const { mutate, isPending: isCreatingOrder } = useCreateOrder();

  const { data: addressData } = useAddress();

  const totalPrice = useMemo(() => {
    return cartData?.cart?.cartItems.reduce((acc, item) => {
      return acc + item.itemPrice * item.quantity;
    }, 0);
  }, [cartData?.cart?.cartItems])?.toFixed(2);

  const form = useForm<
    z.infer<typeof checkOutShippingInformation>,
    ZodValidator
  >({
    defaultValues: {
      city: addressData?.userAddress?.city || "",
      state: addressData?.userAddress?.state || "",
      streetAddress: addressData?.userAddress?.streetAddress || "",
      phoneNumber: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: checkOutShippingInformation,
    },
  });

  const createOrder = () => {
    mutate({
      city: form.state.values.city,
      wilaya: form.state.values.state,
      streetAddress: form.state.values.streetAddress,
      phoneNumber: form.state.values.phoneNumber,
    });
  };

  if (isGettingCart)
    return (
      <div className="flex w-full justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );

  if (!cartData || !cartData.cart || cartData.cart.cartItems.length === 0)
    return (
      <EmptyListMessage
        message="Your cart is empty. Plz fill it and then come again 😁"
        listName="Checkout"
      />
    );

  return (
    <div className="grid w-full grid-cols-1 items-start justify-between gap-16 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <h4 className="h4 font-bold">Shipping Information</h4>
        <div className="flex flex-col space-y-2">
          <div className="flex w-full max-w-[600px] flex-col gap-x-4 gap-y-4 lg:flex-row">
            <div className="w-full max-w-[600px]">
              <form.Field
                name="streetAddress"
                children={(field) => (
                  <FormField
                    inputType="text"
                    name={field.name}
                    field={field}
                    label="Street Address"
                  />
                )}
              />
            </div>
            <div className="w-full max-w-[600px]">
              <form.Field
                name="state"
                children={(field) => (
                  <FormField
                    inputType="text"
                    name={field.name}
                    field={field}
                    label="State"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex w-full max-w-[600px] flex-col gap-x-4 gap-y-4 lg:flex-row">
            <div className="w-full max-w-[600px]">
              <form.Field
                name="city"
                children={(field) => (
                  <FormField
                    inputType="text"
                    name={field.name}
                    field={field}
                    label="City"
                  />
                )}
              />
            </div>
            <div className="w-full max-w-[600px]">
              <form.Field
                name="phoneNumber"
                children={(field) => (
                  <FormField
                    inputType="text"
                    name={field.name}
                    field={field}
                    label="Phone Number"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col gap-y-6">
        <h4 className="h4 font-bold">Your Order</h4>
        <div className="inline-flex flex-col gap-y-4">
          <div className="inline-flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {cartData.cart.cartItems.map((item) => (
                <div
                  className="size-8 rounded-full bg-gray-300 p-[6px]"
                  key={item.id}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={item.size.variant.images[0].imagePath}
                  />
                </div>
              ))}
            </div>
            <Button variant="outline">Edit Cart</Button>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Subtotal:</p>
            <p className="body-1">$ {totalPrice}</p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Shipping:</p>
            <p className="body-1">Free</p>
          </div>
          <div className="inline-flex items-center justify-between">
            <p className="body-1 text-black/70">Tax:</p>
            <p className="body-1">0</p>
          </div>
          <hr />
          <div className="inline-flex items-center justify-between">
            <p className="body-1 font-bold">Total:</p>
            <p className="body-1 font-bold">$ {totalPrice}</p>
          </div>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.values,
            ]}
            children={([canSubmit, isSubmitting, values]) => (
              <Button
                onClick={createOrder}
                disabled={
                  isCreatingOrder ||
                  !(canSubmit as boolean) ||
                  (isSubmitting as boolean) ||
                  Object.values(values).every((value) => {
                    return value === "";
                  })
                }
              >
                Place Order
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
}
