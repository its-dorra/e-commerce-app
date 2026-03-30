"use client";

import { Button } from "@/components/ui/button";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";

import { useForm } from "@tanstack/react-form";

import FormField from "@/lib/components/FormField";
import Link from "next/link";

import { z } from "zod";
import { loginSchema } from "@/server/schemas/users";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>, ZodValidator>({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
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
        <p className="eyebrow">Welcome back</p>
        <h1 className="h3">Log in to continue shopping</h1>
        <p className="text-sm text-zinc-600">
          Access your wishlist, cart, and order updates in one place.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <form.Field
          name="email"
          children={(field) => {
            return (
              <FormField
                inputType="email"
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
              Login
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-1 text-sm">
        <p className="text-zinc-600">Don&apos;t have an account?</p>
        <Link className="font-medium text-zinc-900" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
