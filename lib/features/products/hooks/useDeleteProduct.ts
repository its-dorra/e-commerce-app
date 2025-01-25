import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.products.deleteProductById.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      utils.products.products.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong, Plz try again");
    },
  });
};
