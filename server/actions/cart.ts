"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import {
  addItemToCart,
  deleteCartItem,
  updateCartItemQuantity,
} from "@/server/data-access/cart";

export const addCartItemAction = authActionClient
  .inputSchema(
    z.object({
      productVariantId: z.string().uuid(),
      quantity: z.number().default(1),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    return addItemToCart({
      productVariantId: parsedInput.productVariantId,
      quantity: parsedInput.quantity,
      userId: ctx.user.id,
    });
  });

export const updateCartItemQuantityAction = authActionClient
  .inputSchema(
    z.object({
      cartItemId: z.string().uuid(),
      quantity: z.number().min(0),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    return updateCartItemQuantity({
      cartItemId: parsedInput.cartItemId,
      quantity: parsedInput.quantity,
      userId: ctx.user.id,
    });
  });

export const deleteCartItemAction = authActionClient
  .inputSchema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    return deleteCartItem({
      cartItemId: parsedInput.id,
      userId: ctx.user.id,
    });
  });
