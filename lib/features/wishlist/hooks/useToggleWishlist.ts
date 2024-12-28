import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist } from "../services";

export const useToggleWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlist,
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist", productId] });

      const previousState = queryClient.getQueryData<boolean>([
        "wishlist",
        productId,
      ]);

      queryClient.setQueryData<boolean>(["wishlist", productId], (oldData) => {
        if (oldData === undefined) return true;
        return !oldData;
      });

      return { previousState, productId };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["wishlist", context?.productId],
        context?.previousState,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist-items"] });
    },
  });
};
