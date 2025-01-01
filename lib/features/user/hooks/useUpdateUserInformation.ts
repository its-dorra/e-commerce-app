import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useUpdateUserInformation = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.auth.updateUserInformation.useMutation({
    onSuccess: () => {
      utils.auth.getCurrentUser.invalidate();
      toast.success("Updated user information successfully");
    },
    onError: (error) => {
      toast.error(`Something went wrong ${error.message}`);
    },
  });
};
