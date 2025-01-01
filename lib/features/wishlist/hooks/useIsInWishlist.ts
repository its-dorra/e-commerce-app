import { clientTrpc } from "@/lib/trpc/client";

export const useIsInWishlist = (value: { productId: number }) =>
  clientTrpc.wishlists.isInWishlist.useQuery(value, {
    refetchOnMount: false,
    retry: false,
  });
