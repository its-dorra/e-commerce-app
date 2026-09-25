"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { updateAccountDetailsSchema } from "../schemas";
import CircleAvatar from "./circle-avatar";
import FormField from "@/lib/components/FormField";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { updateUserInformationAction } from "@/server/actions/auth";
import toast from "react-hot-toast";
import { User } from "better-auth";

export default function AccountDetailsForm({
  userDetails,
}: {
  userDetails: User;
}) {
  const { execute, isPending } = useAction(updateUserInformationAction, {
    onSuccess: () => {
      toast.success("Account details updated successfully.");
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to update details: ${error.serverError || "Please try again."}`,
      );
    },
  });

  const displayName = userDetails.name;

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
      displayName,
    } as z.infer<typeof updateAccountDetailsSchema>,
    validators: {
      onChange: updateAccountDetailsSchema,
    },
    onSubmit: ({ value }) => {
      execute(value);
    },
  });

  return (
    <div className="mt-2 space-y-6">
      <CircleAvatar name={displayName} imageUrl={userDetails.image || ""} />

      <form
        className="flex flex-col gap-y-5 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-6 md:p-8"
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
              <FormField
                inputType="text"
                name={field.name}
                field={field}
                label="Full Name"
              />
            )}
          />
        </div>
        <div className="flex w-full max-w-[600px] flex-col gap-x-4 gap-y-4 lg:flex-row">
          <div className="w-full max-w-[600px]">
            <form.Field
              name="password"
              children={(field) => (
                <FormField
                  inputType="password"
                  name={field.name}
                  field={field}
                  label="New Password"
                />
              )}
            />
          </div>
          <div className="w-full max-w-[600px]">
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <FormField
                  inputType="password"
                  name={field.name}
                  field={field}
                  label="Confirm New Password"
                />
              )}
            />
          </div>
        </div>
        <Button
          variant="primary"
          className="mt-2 w-fit font-medium"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
