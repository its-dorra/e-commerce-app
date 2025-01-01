"use client";

import { insertAddressSchema } from "@/server/db/schema/address";
import { useForm } from "@tanstack/react-form";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { useAddress } from "../hooks/useAddress";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormField from "@/lib/components/FormField";
import { useUpdateAddress } from "../hooks/useUpdateAddress";

export default function AddressForm() {
  const { data } = useAddress();
  const { mutate, isPending: isUpdatingAddress } = useUpdateAddress();

  const form = useForm<z.infer<typeof insertAddressSchema>, ZodValidator>({
    defaultValues: {
      city: data?.userAddress?.city || "",
      state: data?.userAddress?.state || "",
      streetAddress: data?.userAddress?.streetAddress || "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: insertAddressSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="mt-4 flex w-full max-w-[600px] flex-col gap-y-4"
    >
      <div className="w-full max-w-[600px]">
        <form.Field
          name="streetAddress"
          children={(field) => (
            <FormField field={field} label="Street Address" />
          )}
        />
      </div>
      <div className="flex w-full max-w-[600px] flex-col gap-x-4 gap-y-4 lg:flex-row">
        <div className="w-full max-w-[600px]">
          <form.Field
            name="city"
            children={(field) => <FormField field={field} label="City" />}
          />
        </div>
        <div className="w-full max-w-[600px]">
          <form.Field
            name="state"
            children={(field) => <FormField field={field} label="State" />}
          />
        </div>
      </div>
      <Button className="mt-8 w-fit" disabled={isUpdatingAddress} type="submit">
        Save Changes
      </Button>
    </form>
  );
}
