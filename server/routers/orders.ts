import { z } from "zod";
import { authenticatedProcedure } from "../middlewares/auth";
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";

const ordersRouter = router({
  makeOrder: authenticatedProcedure
    .input(z.object({ cartId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { cartId, userId } = input;
      const { user } = ctx;
      if (user.id !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to make this order",
        });
      }
    }),
});
