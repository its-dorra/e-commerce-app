"use server";

import { adminActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { deleteProductById } from "@/server/data-access/products";

export const deleteProductAction = adminActionClient
  .inputSchema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return deleteProductById(parsedInput.id);
  });
