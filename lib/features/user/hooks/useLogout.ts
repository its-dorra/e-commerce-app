import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const mutate = async () => {
    setIsPending(true);
    try {
      await authClient.signOut();
      toast.success("You logged out successfully");
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(`Something wrong happened, ${error?.message || "error"}`);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
