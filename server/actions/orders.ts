"use server";

import { adminActionClient, authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import {
  acceptOrder,
  cancelOrder,
  createOrder,
  getOrder,
  setOrderAsSeen,
} from "@/server/data-access/orders";
import { revalidateOrdersCache } from "@/server/data-access/orders.cache";

export const createOrderAction = authActionClient
  .inputSchema(
    z.object({
      streetAddress: z.string().min(5),
      city: z.string().min(4),
      wilaya: z.string().min(4),
      phoneNumber: z.string().length(10),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    return createOrder({
      userId: ctx.user.id,
      ...parsedInput,
    });
  });

export const acceptOrderAction = adminActionClient
  .inputSchema(
    z.object({
      orderId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return acceptOrder({
      orderId: parsedInput.orderId,
    });
  });

export const cancelOrderAction = adminActionClient
  .inputSchema(
    z.object({
      orderId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return cancelOrder({
      orderId: parsedInput.orderId,
    });
  });

export const setOrderAsSeenAction = adminActionClient
  .inputSchema(
    z.object({
      orderId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const order = await getOrder(parsedInput.orderId);
    const result = await setOrderAsSeen({
      orderId: parsedInput.orderId,
    });
    revalidateOrdersCache({
      id: parsedInput.orderId,
      userId: order?.userId,
    });
    return result;
  });
