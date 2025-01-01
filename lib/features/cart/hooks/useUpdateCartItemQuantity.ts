import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useUpdateCartItemQuantity = () => {
  const utils = clientTrpc.useUtils();
  return clientTrpc.carts.updateCartItemQuantity.useMutation({
    onMutate: async ({ cartItemId, quantity }) => {
      await utils.carts.getCart.cancel();

      const previousState = utils.carts.getCart.getData();

      utils.carts.getCart.setData(undefined, (oldData) => {
        if (!oldData || !oldData.cart) return undefined;
        return {
          cart: {
            ...oldData.cart,
            cartItems: oldData.cart?.cartItems.map((item) =>
              item.id === cartItemId ? { ...item, quantity } : item,
            ),
          },
        };
      });

      return { previousState };
    },
    onError: (error, variables, context) => {
      console.error({ error });
      utils.carts.getCart.setData(undefined, context?.previousState);
      toast.error("Can't update cart item. Plz try again");
    },
  });
};
