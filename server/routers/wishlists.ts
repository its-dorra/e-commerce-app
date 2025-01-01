import { z } from "zod";
import {
  getAllwishlistItems,
  isProductInWishList,
  toggleProductInWishList,
} from "../data-access/wishlist";
import { router } from "../trpc";
import { authenticatedProcedure } from "../middlewares/auth";

const wishlistRouter = router({
  isInWishlist: authenticatedProcedure
    .input(
      z.object({
        productId: z.coerce.number().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { productId } = input;
      const { id: userId } = ctx.user;

      const isInWishlist = await isProductInWishList({ productId, userId });

      return isInWishlist;
    }),
  getWishlistItems: authenticatedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const result = await getAllwishlistItems({ userId });
    return result;
  }),
  toggleWishlistItem: authenticatedProcedure
    .input(
      z.object({
        productId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const { id: userId } = ctx.user;

      const result = await toggleProductInWishList({ productId, userId });

      return result;
    }),
});

export default wishlistRouter;
