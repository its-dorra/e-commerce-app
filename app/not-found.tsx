"use client";

import { arrowLeftIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto min-h-screen space-y-8 py-12">
      <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
      <p className="text-lg">This page could not be found</p>
      <Button variant="link" onClick={() => router.back()}>
        <Image src={arrowLeftIcon} alt="arrow left icon" />
        <span>Go back</span>
      </Button>
    </div>
  );
}
