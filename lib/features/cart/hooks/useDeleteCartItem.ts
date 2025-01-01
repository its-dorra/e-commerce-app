import toast from "react-hot-toast";
import { clientTrpc } from "@/lib/trpc/client";

export const useDeleteCartItem = () => {
  const utils = clientTrpc.useUtils();
  return clientTrpc.carts.deleteCartItem.useMutation({
    onMutate: async ({ id }) => {
      await utils.carts.getCart.cancel();

      const previousState = utils.carts.getCart.getData();

      utils.carts.getCart.setData(undefined, (oldData) => {
        if (!oldData || !oldData.cart) return undefined;

        return {
          cart: {
            ...oldData.cart,
            cartItems: oldData.cart.cartItems.filter((item) => item.id !== id),
          },
        };
      });

      return { previousState };
    },
    onError: (error, vars, context) => {
      utils.carts.getCart.setData(undefined, context?.previousState);
      toast.error("Can't delete cart item. Plz try again");
    },
  });
};
