import { clientTrpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignup = () => {
  const router = useRouter();
  const utils = clientTrpc.useUtils();

  return clientTrpc.auth.signup.useMutation({
    onSuccess: () => {
      toast.success("You created an account successfully , Enjoy your session");
      utils.auth.getCurrentUser.invalidate();
      router.replace("/products");
    },
    onError: (error) => {
      toast.error("Something went wrong \n" + error.message);
    },
  });
};
