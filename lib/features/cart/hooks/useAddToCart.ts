import { clientTrpc } from "@/lib/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.carts.addCartItem.useMutation({
    onSuccess: () => {
      toast.success("Item added to cart successfully");
      utils.carts.getCart.invalidate();
    },
    onError: () => {
      toast.error("Can't add item to cart . Plz try again");
    },
  });
};
