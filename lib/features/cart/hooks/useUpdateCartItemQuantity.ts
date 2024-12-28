import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItemQuantity } from "../services";
import toast from "react-hot-toast";
import queryKey from "./useCart";
import { Cart } from "../types";

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItemQuantity,
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<Cart>(queryKey);

      queryClient.setQueryData<Cart>(queryKey, (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          cartItems: oldData.cartItems.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item,
          ),
        };
      });

      return { previousState };
    },
    onError: (error, variables, context) => {
      console.error({ error });
      queryClient.setQueryData(queryKey, context?.previousState);
      toast.error("Can't update cart item. Plz try again");
    },
  });
};
