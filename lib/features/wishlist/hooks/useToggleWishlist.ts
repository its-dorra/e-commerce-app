import { clientTrpc } from "@/lib/trpc/client";
import toast from "react-hot-toast";

export const useToggleWishList = () => {
  const utils = clientTrpc.useUtils();

  return clientTrpc.wishlists.toggleWishlistItem.useMutation({
    onMutate: async ({ productId }) => {
      await utils.wishlists.isInWishlist.cancel({ productId });

      const previousState = utils.wishlists.isInWishlist.getData({ productId });

      utils.wishlists.isInWishlist.setData({ productId }, (oldData) => {
        if (oldData === undefined) return true;

        return !oldData;
      });

      return { previousState };
    },
    onError: (error, { productId }, context) => {
      toast.error(`Something wrong happend ${error.message}`);

      utils.wishlists.isInWishlist.setData(
        { productId },
        context?.previousState,
      );
    },
    onSettled: () => {
      utils.wishlists.getWishlistItems.invalidate();
    },
  });
};
