import { clientTrpc } from "@/lib/trpc/client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (product: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products/add-product", {
        method: "POST",
        body: product,
      });

      await res.json();

      toast.success("Product added successfully");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addProduct,
    isLoading,
    error,
  } as const;
};
