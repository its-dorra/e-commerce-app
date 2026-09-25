"use client";

import { Button } from "@/components/ui/button";
import { googleIcon } from "@/assets";
import Image from "next/image";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

interface GoogleOAuthButtonProps {
  text?: string;
}

export default function GoogleOAuthButton({
  text = "Continue with Google",
}: GoogleOAuthButtonProps) {
  const { mutate, isPending } = useGoogleLogin();

  return (
    <Button
      type="button"
      variant="outline"
      className="flex w-full items-center justify-center gap-x-2 border-stone-300 py-2.5 font-medium text-stone-800 hover:bg-stone-100"
      onClick={() => mutate()}
      disabled={isPending}
    >
      <Image src={googleIcon} alt="Google" className="h-5 w-5" />
      <span>{isPending ? "Connecting to Google..." : text}</span>
    </Button>
  );
}
