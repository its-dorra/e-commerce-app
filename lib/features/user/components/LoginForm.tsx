"use client";

import { Button } from "@/components/ui/button";

import { useForm } from "@tanstack/react-form";

import FormField from "@/lib/components/FormField";
import Link from "next/link";

import { loginSchema } from "@/server/schemas/users";

import { useLogin } from "../hooks/useLogin";
import GoogleOAuthButton from "./GoogleOAuthButton";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
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
    <div className="mx-auto flex w-full max-w-md flex-col gap-y-7">
      <div className="space-y-2">
        <p className="eyebrow">Welcome Back</p>
        <h1 className="font-display text-3xl font-normal text-stone-900">
          Sign In to Your Account
        </h1>
        <p className="font-body text-xs text-stone-500">
          Access your curated wishlist, shopping bag, and expedited checkout.
        </p>
      </div>

      <GoogleOAuthButton text="Sign in with Google" />

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-stone-200" />
        <span className="absolute bg-white px-3 text-xs uppercase tracking-wider text-stone-400">
          Or
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
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
              className="mt-3 w-full font-medium"
              variant="primary"
              type="submit"
              disabled={!canSubmit || isSubmitting || isPending}
            >
              {isPending ? "Authenticating..." : "Sign In"}
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-1.5 font-body text-xs text-stone-500">
        <p>Don&apos;t have an account?</p>
        <Link
          className="font-medium text-amber-800 hover:underline"
          href="/signup"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}
