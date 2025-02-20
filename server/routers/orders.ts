import { z } from "zod";
import { adminProcedure, authenticatedProcedure } from "../middlewares/auth";
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  createOrder,
  getOrders,
  getOrdersByUser,
} from "@/server/data-access/orders";
import { PER_PAGE } from "@/lib/constants/app-config";

const ordersRouter = router({
  createOrder: authenticatedProcedure
    .input(
      z.object({
        streetAddress: z.string().min(5),
        city: z.string().min(4),
        wilaya: z.string().min(4),
        phoneNumber: z.string().min(10).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      try {
        const data = await createOrder({ userId: user.id, ...input });

        return { success: true, message: "Order created", data };
      } catch (e) {
        const error = e as Error;
        throw new TRPCError({
          message: error.message,
          code: "BAD_REQUEST",
        });
      }
    }),
  getOrders: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).default(PER_PAGE),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getOrders(input);
      } catch (e) {
        throw new TRPCError({
          message: (e as Error).message,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getOrdersByUser: authenticatedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).default(PER_PAGE),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { user } = ctx;
      try {
        return await getOrdersByUser({ ...input, userId: user.id });
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (e as Error).message,
        });
      }
    }),
});

export default ordersRouter;
