import { z } from "zod";
import { authenticatedProcedure } from "../middlewares/auth";
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";
import {getCartItems} from "@/server/data-access/cart";

const ordersRouter = router({
  makeOrder: authenticatedProcedure

    .mutation(async ({ ctx }) => {
      const { user } = ctx;


      const cart = await getCartItems(user.id)

        if(!cart || cart.cartItems.length === 0) {
            throw new TRPCError({
                code : "BAD_REQUEST",
                message : "Your cart is empty , fill it before ordering"
            })
        }




    }),
});


export default ordersRouter;