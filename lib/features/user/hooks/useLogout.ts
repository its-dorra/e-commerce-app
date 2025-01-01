import { clientTrpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogout = () => {
  const utils = clientTrpc.useUtils();
  const router = useRouter();

  return clientTrpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("You logged out successfully");
      utils.auth.getCurrentUser.reset(undefined, { cancelRefetch: true });
      router.replace("/");
    },
    onError: (error) => {
      toast.error(`Something wrong happened, ${error.message}`);
    },
  });
};
