"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p>Something wrong happened</p>
      <p>{error.message}</p>
      <Button variant="ghost">
        <Link className="flex items-center gap-x-2" href="/products">
          <MoveLeft />
          Go to Listing
        </Link>
      </Button>
    </div>
  );
}
