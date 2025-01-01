import toast from "react-hot-toast";
import { clientTrpc } from "@/lib/trpc/client";

export const useUpdateAddress = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.address.updateUserAddress.useMutation({
    onSuccess: () => {
      utils.address.getUserAddress.invalidate();
      toast.success("Your address was updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong, Plz try again");
    },
  });
};
