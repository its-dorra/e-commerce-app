import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSignup = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setIsPending(true);
    try {
      const res = await authClient.signUp.email({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to sign up");
        return;
      }

      toast.success("You created an account successfully, enjoy your session");
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
