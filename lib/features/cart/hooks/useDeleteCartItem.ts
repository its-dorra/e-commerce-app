import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../services";
import toast from "react-hot-toast";
import queryKey from "./useCart";
import { Cart } from "../types";

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,
    onMutate: async ({ cartItemId }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<Cart>(queryKey);

      queryClient.setQueryData<Cart>(queryKey, (oldData) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          cartItems: oldData.cartItems.filter((item) => item.id !== cartItemId),
        };
      });

      return { previousState };
    },
    onError: (error, vars, context) => {
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Can't delete cart item. Plz try again");
    },
  });
};
