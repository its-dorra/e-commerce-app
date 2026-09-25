"use client";

import EmptyListMessage from "@/lib/components/EmptyListMessage";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { insertAddressSchema } from "@/server/db/schema/address";
import FormField from "@/lib/components/FormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAction } from "next-safe-action/hooks";
import { createOrderAction } from "@/server/actions/orders";
import type { Cart } from "../../cart/types";

const checkOutShippingInformation = insertAddressSchema.merge(
  z.object({
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be exactly 10 digits" })
      .max(10, { message: "Phone number must be exactly 10 digits" }),
  }),
);

export default function CheckoutContainer({
  cart,
  address,
}: {
  cart?: Cart | null;
  address?: {
    city: string;
    state: string;
    streetAddress: string;
  } | null;
}) {
  const router = useRouter();

  const { execute: createOrder, isPending: isCreatingOrder } = useAction(
    createOrderAction,
    {
      onSuccess: ({ data }) => {
        if (data?.id) {
          toast.success("Order created successfully.");
          router.replace(`/orders/${data.id}/success`);
        }
      },
      onError: ({ error }) => {
        toast.error(
          `Error creating order: ${error.serverError || "Please try again."}`,
        );
      },
    },
  );

  const totalPrice = useMemo(() => {
    return cart?.cartItems.reduce((acc, item) => {
      return acc + item.itemPrice * item.quantity;
    }, 0);
  }, [cart?.cartItems])?.toFixed(2);

  const form = useForm({
    defaultValues: {
      city: address?.city || "",
      state: address?.state || "",
      streetAddress: address?.streetAddress || "",
      phoneNumber: "",
    },
    validators: {
      onChange: checkOutShippingInformation,
    },
  });

  const handleCreateOrder = () => {
    createOrder({
      city: form.state.values.city,
      wilaya: form.state.values.state,
      streetAddress: form.state.values.streetAddress,
      phoneNumber: form.state.values.phoneNumber,
    });
  };

  if (!cart || !cart.cartItems || cart.cartItems.length === 0)
    return (
      <EmptyListMessage
        message="Your cart is empty. Please add items to your cart before checking out."
        listName="Checkout"
      />
    );

  return (
    <div className="grid w-full grid-cols-1 items-start justify-between gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="shadow-xs rounded-2xl border border-stone-200/80 bg-white p-6 md:p-8">
        <h4 className="font-display text-2xl font-normal tracking-tight text-stone-900">
          Shipping & Contact Information
        </h4>
        <p className="mt-1 font-body text-xs text-stone-500">
          Please provide the exact delivery destination for your items.
        </p>

        <div className="mt-6 flex flex-col space-y-4">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <div className="w-full">
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
            <div className="w-full">
              <form.Field
                name="state"
                children={(field) => (
                  <FormField
                    inputType="text"
                    name={field.name}
                    field={field}
                    label="State / Province"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <div className="w-full">
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
            <div className="w-full">
              <form.Field
                name="phoneNumber"
                children={(field) => (
                  <FormField
                    inputType="tel"
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

      <div className="shadow-xs rounded-2xl border border-stone-200/80 bg-stone-50/80 p-6 md:sticky md:top-28">
        <h4 className="font-display text-xl font-normal tracking-tight text-stone-900">
          Order Summary
        </h4>
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4">
            <div className="flex items-center gap-x-2">
              {cart.cartItems.map((item) => (
                <div
                  className="size-10 overflow-hidden rounded-full border border-stone-200 bg-white"
                  key={item.id}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={item.size.variant.images[0]?.imagePath || ""}
                    alt="product thumbnail"
                  />
                </div>
              ))}
            </div>
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="font-body text-xs text-stone-700 hover:text-stone-900"
              >
                Modify Cart
              </Button>
            </Link>
          </div>

          <div className="space-y-2.5 font-body text-xs">
            <div className="flex items-center justify-between text-stone-500">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-900">
                $ {totalPrice}
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-500">
              <span>Shipping:</span>
              <span className="font-medium text-emerald-700">
                Complimentary
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-500">
              <span>Estimated Tax:</span>
              <span className="font-medium text-stone-900">$ 0.00</span>
            </div>
          </div>

          <hr className="border-stone-200" />
          <div className="flex items-center justify-between font-body text-sm font-semibold text-stone-900">
            <span>Total:</span>
            <span className="text-base text-amber-800">$ {totalPrice}</span>
          </div>

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.values,
            ]}
            children={([canSubmit, isSubmitting, values]) => (
              <Button
                onClick={handleCreateOrder}
                disabled={
                  isCreatingOrder ||
                  !(canSubmit as boolean) ||
                  (isSubmitting as boolean) ||
                  Object.values(values).every((value) => {
                    return value === "";
                  })
                }
                variant="primary"
                className="mt-2 h-11 w-full font-medium"
              >
                {isCreatingOrder ? "Processing..." : "Place Order"}
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
}
