"use client";

import { Button } from "@/components/ui/button";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";

import { useForm } from "@tanstack/react-form";

import FormField from "../../../components/FormField";
import Link from "next/link";
import { signupSchema } from "@/server/schemas/users";
import { z } from "zod";
import { useSignup } from "../hooks/useSignup";

export default function SignupForm() {
  const { mutate, isPending } = useSignup();
  const form = useForm<z.infer<typeof signupSchema>, ZodValidator>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: signupSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-y-8">
      <div className="space-y-2">
        <p className="eyebrow">Create account</p>
        <h1 className="h3">Join the Fashion Haven community</h1>
        <p className="text-sm text-zinc-600">
          Build your personalized style profile and track your orders with ease.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <form.Field
          name="fullName"
          children={(field) => {
            return (
              <FormField
                inputType="text"
                name={field.name}
                field={field}
                label="Name"
              />
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <FormField
                inputType="text"
                name={field.name}
                field={field}
                label="Email"
              />
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return (
              <FormField
                inputType="password"
                name={field.name}
                field={field}
                label="Password"
              />
            );
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              className="mt-2 w-full"
              variant="primary"
              type="submit"
              disabled={!canSubmit || isSubmitting || isPending}
            >
              Create an account
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-2 text-sm">
        <p className="text-zinc-600">Already have an account?</p>
        <Link className="font-medium text-zinc-900" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
