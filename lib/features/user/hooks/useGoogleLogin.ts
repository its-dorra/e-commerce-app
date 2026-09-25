import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useGoogleLogin = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async () => {
    setIsPending(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/products",
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to authenticate with Google");
        setIsPending(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
