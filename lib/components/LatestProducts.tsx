"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductsContainer from "../features/products/components/ProductsContainer";
import { bestSelling, latestProducts } from "../constants";

export default function LatestProducts() {
  const [state, setState] = useState<"Featured" | "Latest">("Featured");

  const handleToggle = () => {
    setState((oldState) => (oldState === "Featured" ? "Latest" : "Featured"));
  };

  return (
    <section className="conntainer space-y-16 py-16">
      <div className="flex items-center justify-center gap-x-3">
        <Button
          onClick={handleToggle}
          className={`${state === "Featured" ? "border-[0.5px]" : "text-black/60"} body-1 rounded-full px-2 py-1`}
        >
          Featured
        </Button>
        <Button
          onClick={handleToggle}
          className={`${state === "Latest" ? "border-[0.5px]" : "text-black/60"} body-1 rounded-full px-2 py-1`}
        >
          Latest
        </Button>
      </div>
      <ProductsContainer
        products={state === "Featured" ? latestProducts : bestSelling}
      />
    </section>
  );
}
