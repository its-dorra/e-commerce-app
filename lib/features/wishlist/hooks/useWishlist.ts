import { clientTrpc } from "@/lib/trpc/client";

export const useWishlist = () =>
  clientTrpc.wishlists.getWishlistItems.useQuery();
