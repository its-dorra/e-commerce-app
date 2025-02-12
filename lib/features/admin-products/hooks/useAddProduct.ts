import { clientTrpc } from "@/lib/trpc/client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAddProduct = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (product: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products/add-product", {
        method: "POST",
        body: product,
      });

      const result = await res.json();
      setData(result);

      toast.success("Product added successfully");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addProduct,
    data,
    isLoading,
    error,
  } as const;
};
