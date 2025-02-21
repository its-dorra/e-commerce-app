import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useCancelOrder = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.orders.cancelOrder.useMutation({
    onSuccess: () => {
      utils.orders.getOrders.invalidate();
      toast.success("Order canceled");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
