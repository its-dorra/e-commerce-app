"use client";

import { googleIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { Separator } from "@/components/ui/separator";

import { useForm } from "@tanstack/react-form";

import Image from "next/image";
import FormField from "../../../components/FormField";
import Link from "next/link";
import { signupSchema } from "@/server/schemas/users";
import { z } from "zod";
import { signup } from "../services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authEvents } from "@/lib/providers/user-provider";

export default function SignupForm() {
  const router = useRouter();

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
    onSubmit: async ({ value }) => {
      try {
        await signup(value);
        toast.success(
          "You created an account successfully , Enjoy your session",
        );
        window.dispatchEvent(new Event(authEvents.authChange));
        router.replace("/");
      } catch (error: any) {
        toast.error(`Something went wrong \n ${error.message}`);
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
      <Button className="flex items-center justify-center gap-x-2 border bg-transparent py-2">
        <Image src={googleIcon} alt="google icon" />
        <p className="text-black/80">Continue with google</p>
      </Button>
      <div className="flex items-center gap-x-2">
        <div className="h-[1px] w-full bg-black/30" />
        <p>OR</p>
        <div className="h-[1px] w-full bg-black/30" />
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <form.Field
          name="fullName"
          children={(field) => {
            return <FormField field={field} label="Name" />;
          }}
        />
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
              Create an account
            </Button>
          )}
        />
      </form>
      <div className="flex items-center justify-center gap-x-2">
        <p className="body-1 text-black/60">Already have an account ?</p>
        <Link className="body-2" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
