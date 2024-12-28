"use client";

import { googleIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { Separator } from "@/components/ui/separator";

import { useForm } from "@tanstack/react-form";

import Image from "next/image";
import FormField from "../../../components/FormField";
import Link from "next/link";

import { z } from "zod";
import { loginSchema } from "@/server/schemas/users";
import { login } from "../services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authEvents } from "@/lib/providers/user-provider";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>, ZodValidator>({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await login(value);
        toast.success("You logged in successfully");
        window.dispatchEvent(new Event(authEvents.authChange));
        router.replace("/");
      } catch (error: any) {
        toast.error("Something went wrong \n" + error.message);
      }
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="mt-24 flex w-full flex-col gap-y-8 md:mt-0 md:w-[380px] lg:w-[420px]">
      <Link className="w-full" href="/api/auth/google">
        <Button
          variant="outline"
          className="flex w-full items-center justify-center gap-x-2 border py-2"
        >
          <Image src={googleIcon} alt="google icon" />
          <p className="text-black/80">Continue with google</p>
        </Button>
      </Link>
      <div className="flex items-center gap-x-2">
        <div className="h-[1px] w-full bg-black/30" />
        <p>OR</p>
        <div className="h-[1px] w-full bg-black/30" />
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <form.Field
          name="email"
          children={(field) => {
            return <FormField field={field} label="Email" />;
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return <FormField field={field} label="Password" />;
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([_, isSubmitting]) => (
            <Button
              className="w-full bg-black text-primaryWhite"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-1">
        <p className="body-1 text-black/60">Don't have an account ?</p>
        <Link className="body-2" href="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
