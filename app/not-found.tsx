"use client";

import { arrowLeftIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center space-y-5 text-center">
      <p className="eyebrow">404 Error</p>
      <h1 className="font-display text-4xl font-normal tracking-tight text-stone-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="font-body max-w-md text-xs font-light text-stone-500 sm:text-sm">
        The destination you are seeking cannot be located in our current
        collections.
      </p>
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="font-body mt-4 gap-2 text-xs text-stone-800 hover:text-stone-950"
      >
        <Image src={arrowLeftIcon} alt="arrow left" className="h-3.5 w-3.5" />
        <span>Return to Previous Page</span>
      </Button>
    </div>
  );
}
