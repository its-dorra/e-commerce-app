"use client";

import { Button } from "@/components/ui/button";

import { useForm } from "@tanstack/react-form";

import FormField from "../../../components/FormField";
import Link from "next/link";
import { signupSchema } from "@/server/schemas/users";
import { useSignup } from "../hooks/useSignup";
import GoogleOAuthButton from "./GoogleOAuthButton";

export default function SignupForm() {
  const { mutate, isPending } = useSignup();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
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
    <div className="mx-auto flex w-full max-w-md flex-col gap-y-7">
      <div className="space-y-2">
        <p className="eyebrow">Maison Membership</p>
        <h1 className="font-display text-3xl font-normal text-stone-900">
          Create Your Account
        </h1>
        <p className="font-body text-xs text-stone-500">
          Curate your fashion profile, save pieces, and experience seamless
          shopping.
        </p>
      </div>

      <GoogleOAuthButton text="Sign up with Google" />

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-stone-200" />
        <span className="absolute bg-white px-3 text-xs uppercase tracking-wider text-stone-400">
          Or
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <form.Field
          name="fullName"
          children={(field) => {
            return (
              <FormField
                inputType="text"
                name={field.name}
                field={field}
                label="Full Name"
              />
            );
          }}
        />
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
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-1.5 font-body text-xs text-stone-500">
        <p>Already have an account?</p>
        <Link
          className="font-medium text-amber-800 hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
