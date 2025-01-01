import { authenticatedProcedure } from "../middlewares/auth";
import { z } from "zod";
import {
  addItemToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../data-access/cart";

import { router } from "../trpc";

const cartRouter = router({
  getCart: authenticatedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const cart = await getCartItems(userId);
    return { cart };
  }),
  addCartItem: authenticatedProcedure
    .input(
      z.object({
        productVariantId: z.number().min(1),
        quantity: z.number().default(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const cartItem = await addItemToCart({ ...input, userId });
      return cartItem;
    }),
  updateCartItemQuantity: authenticatedProcedure
    .input(
      z.object({ cartItemId: z.number().min(1), quantity: z.number().min(0) }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const [cartItem] = await updateCartItemQuantity({ ...input, userId });

      return cartItem;
    }),
  deleteCartItem: authenticatedProcedure
    .input(
      z.object({
        id: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { id: cartItemId } = input;

      const [cartItem] = await deleteCartItem({ cartItemId, userId });

      return cartItem;
    }),
});

export default cartRouter;
