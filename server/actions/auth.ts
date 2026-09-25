"use server";

import { actionClient, authActionClient } from "@/lib/safe-action";
import { updateUserInformationSchema } from "@/server/schemas/users";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { revalidateUserCache } from "@/server/data-access/users.cache";

export const updateUserInformationAction = authActionClient
  .inputSchema(updateUserInformationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const headersList = await headers();

    if (parsedInput.displayName) {
      await auth.api.updateUser({
        body: {
          name: parsedInput.displayName,
        },
        headers: headersList,
      });
    }

    if (parsedInput.password) {
      await auth.api.setPassword({
        body: {
          newPassword: parsedInput.password,
        },
        headers: headersList,
      });
    }

    revalidateUserCache(ctx.user.id);

    return { success: true };
  });
