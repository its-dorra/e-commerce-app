import { authenticatedProcedure, isAuth } from "../middlewares/auth";

import { addUserAddress, getUserAddress } from "../data-access/address";

import { insertAddressSchema } from "../db/schema/address";
import { router } from "../trpc";

const addressRouter = router({
  getUserAddress: authenticatedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const userAddress = await getUserAddress({ userId });

    return { userAddress };
  }),
  updateUserAddress: authenticatedProcedure
    .input(insertAddressSchema)
    .mutation(async ({ ctx, input: address }) => {
      const { id: userId } = ctx.user;

      const userAddress = await addUserAddress({ ...address, userId });

      return userAddress;
    }),
});

export default addressRouter;
