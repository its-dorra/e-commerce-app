import { useSuspenseQuery } from "@tanstack/react-query";
import { getWishlistItems } from "../services";

export const useWishlist = () =>
  useSuspenseQuery({
    queryFn: getWishlistItems,
    queryKey: ["wishlist-items"],
  });
