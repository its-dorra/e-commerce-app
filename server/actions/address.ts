"use server";

import { authActionClient } from "@/lib/safe-action";
import { insertAddressSchema } from "@/server/db/schema/address";
import { addUserAddress } from "@/server/data-access/address";

export const updateUserAddressAction = authActionClient
  .inputSchema(insertAddressSchema)
  .action(async ({ parsedInput, ctx }) => {
    return addUserAddress({
      ...parsedInput,
      userId: ctx.user.id,
    });
  });
