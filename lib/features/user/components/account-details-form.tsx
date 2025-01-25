"use client";

import { useForm } from "@tanstack/react-form";
import { useUser } from "../hooks/useUser";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { updateAccountDetailsSchema } from "../schemas";
import CircleAvatar from "./circle-avatar";
import FormField from "@/lib/components/FormField";
import { Button } from "@/components/ui/button";
import { useUpdateUserInformation } from "../hooks/useUpdateUserInformation";

export default function AccountDetailsForm() {
  const { data: user } = useUser();
  const { mutate, isPending } = useUpdateUserInformation();

  const form = useForm<
    z.infer<typeof updateAccountDetailsSchema>,
    ZodValidator
  >({
    defaultValues: {
      password: "",
      confirmPassword: "",
      displayName: user?.profile?.displayName || "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: updateAccountDetailsSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <div className="mt-4 space-y-4">
      <CircleAvatar
        name={user?.profile?.displayName || ""}
        imageUrl={user?.profile?.image || ""}
      />

      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full max-w-[600px]">
          <form.Field
            name="displayName"
            children={(field) => (
              <FormField name={field.name} field={field} label="FullName" />
            )}
          />
        </div>
        {user?.account?.accountType === "email" && (
          <div className="flex w-full max-w-[600px] flex-col gap-x-4 gap-y-4 lg:flex-row">
            <div className="w-full max-w-[600px]">
              <form.Field
                name="password"
                children={(field) => (
                  <FormField name={field.name} field={field} label="Password" />
                )}
              />
            </div>
            <div className="w-full max-w-[600px]">
              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <FormField
                    name={field.name}
                    field={field}
                    label="Confirm password"
                  />
                )}
              />
            </div>
          </div>
        )}
        <Button className="mt-8 w-fit" type="submit" disabled={isPending}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
