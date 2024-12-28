import { useQuery } from "@tanstack/react-query";
import { isInWishlist } from "../services";

export const useIsInWishlist = (productId: number) =>
  useQuery({
    queryFn: () => isInWishlist({ productId }),
    queryKey: ["wishlist", productId],
  });
