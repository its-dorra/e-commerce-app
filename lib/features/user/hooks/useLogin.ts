import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: { email: string; password: string }) => {
    setIsPending(true);
    try {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to sign in");
        return;
      }

      toast.success("You logged in successfully");
      router.replace("/products");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
