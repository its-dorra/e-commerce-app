"use client";

import { insertAddressSchema } from "@/server/db/schema/address";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormField from "@/lib/components/FormField";
import { useAction } from "next-safe-action/hooks";
import { updateUserAddressAction } from "@/server/actions/address";
import toast from "react-hot-toast";

export default function AddressForm({
  address,
}: {
  address?: {
    city: string;
    state: string;
    streetAddress: string;
  } | null;
}) {
  const { execute, isPending: isUpdatingAddress } = useAction(
    updateUserAddressAction,
    {
      onSuccess: () => {
        toast.success("Address updated successfully.");
      },
      onError: ({ error }) => {
        toast.error(
          `Failed to update address: ${error.serverError || "Please try again."}`,
        );
      },
    },
  );

  const form = useForm({
    defaultValues: {
      city: address?.city || "",
      state: address?.state || "",
      streetAddress: address?.streetAddress || "",
    },
    validators: {
      onChange: insertAddressSchema,
    },
    onSubmit: async ({ value }) => {
      execute(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex w-full max-w-[700px] flex-col gap-y-5 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-6 md:p-8"
    >
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            className="mt-2 w-fit font-medium"
            variant="primary"
            disabled={isUpdatingAddress || !canSubmit || isSubmitting}
            type="submit"
          >
            {isUpdatingAddress ? "Saving..." : "Save Changes"}
          </Button>
        )}
      />
    </form>
  );
}
