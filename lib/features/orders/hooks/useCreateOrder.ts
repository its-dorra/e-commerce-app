import { clientTrpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const utils = clientTrpc.useUtils();
  const router = useRouter();

  return clientTrpc.orders.createOrder.useMutation({
    onSuccess: (order) => {
      utils.carts.getCart.invalidate();
      utils.orders.getOrdersByUser.invalidate();
      toast.success("Order created successfully.");
      router.replace(`/orders/${order.data.id}/success`);
    },
    onError: (error) => {
      toast.error(`Error creating order , ${error.message}`);
    },
  });
};
