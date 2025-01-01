import bcrypt from "bcrypt";
import { setSession, validateRequest } from "../lucia/utils";

import { cookies } from "next/headers";

import {
  loginSchema,
  signupSchema,
  updateUserInformationSchema,
} from "../schemas/users";
import {
  createAccount,
  createProfile,
  createUser,
  getAccountByUserId,
  getUserByEmail,
  getUserWithFullDetails,
  updateAccountDetails,
} from "@/server/data-access/users";
import { z } from "zod";
import { authenticatedProcedure } from "../middlewares/auth";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { lucia } from "../lucia";
import { updateAccountDetailsSchema } from "@/lib/features/user/schemas";

const authRouter = router({
  login: procedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      throw new TRPCError({
        message: "Account doesn't exist!",
        code: "UNAUTHORIZED",
      });
    }

    const account = await getAccountByUserId(existingUser.id);

    if (!account) {
      throw new TRPCError({
        message: "Account doesn't exist!",
        code: "UNAUTHORIZED",
      });
    }

    if (!account.password) {
      throw new TRPCError({
        message: "Use another method to login",
        code: "FORBIDDEN",
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      throw new TRPCError({
        message: "Wrong password",
        code: "UNAUTHORIZED",
      });
    }

    await setSession(existingUser.id);
    return { success: true, message: "You logged in successfully" };
  }),
  signup: procedure.input(signupSchema).mutation(async ({ input }) => {
    const { email, fullName, password } = input;

    const exisitingUser = await getUserByEmail(email);

    if (exisitingUser) {
      throw new TRPCError({
        message: "Account already exists",
        code: "UNAUTHORIZED",
      });
    }

    const user = await createUser(email);

    await Promise.all([
      createAccount(user.id, password),
      createProfile(user.id, fullName),
    ]);

    await setSession(user.id);

    return {
      success: true,
      message: "You created and account and logged in successfully",
    };
  }),
  getCurrentUser: authenticatedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const currentUser = await getUserWithFullDetails(userId);
    if (!currentUser) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }
    return currentUser;
  }),
  updateUserInformation: authenticatedProcedure
    .input(updateUserInformationSchema)
    .mutation(async ({ ctx, input: { password, displayName } }) => {
      const { id: userId } = ctx.user;

      await updateAccountDetails({ userId, password, displayName });

      return {
        success: true,
        message: "Updated user information successfully",
      };
    }),
  logout: authenticatedProcedure.mutation(async () => {
    const { session } = await validateRequest();
    if (!session) {
      return { success: true };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  }),
});

export default authRouter;

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
