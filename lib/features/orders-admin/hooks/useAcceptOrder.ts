import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useAcceptOrder = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.orders.acceptOrder.useMutation({
    onSuccess: () => {
      utils.orders.getOrders.invalidate();
      toast.success("Order accepted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
