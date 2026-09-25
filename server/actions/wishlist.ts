"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { toggleProductInWishList } from "@/server/data-access/wishlist";

export const toggleWishlistItemAction = authActionClient
  .inputSchema(
    z.object({
      productId: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    return toggleProductInWishList({
      productId: parsedInput.productId,
      userId: ctx.user.id,
    });
  });
