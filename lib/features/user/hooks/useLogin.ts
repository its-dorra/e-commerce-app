import { clientTrpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();

  const utils = clientTrpc.useUtils();

  return clientTrpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("You logged in successfully");
      utils.auth.getCurrentUser.invalidate();
      router.replace("/");
    },
    onError: (error) => {
      toast.error("Something went wrong \n" + error.message);
    },
  });
};
