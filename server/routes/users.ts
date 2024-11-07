import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { setSession, validateRequest } from "../lucia/utils";

import { googleClient, lucia } from "../lucia";
import {
  generateCodeVerifier,
  generateState,
  OAuth2RequestError,
} from "arctic";
import { cookies } from "next/headers";

import { createGoogleUser, getAccountByGoogleId } from "../lucia/oauth-google";
import { afterLogin } from "@/lib/constants/app-config";
import { loginSchema, signupSchema } from "../schemas/users";
import {
  createAccount,
  createProfile,
  createUser,
  getAccountByUserId,
  getUserByEmail,
} from "@/server/data-access/users";
import { z } from "zod";

const route = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const { email, password } = c.req.valid("json");

      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        c.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Account doesn't exist!");
      }

      const account = await getAccountByUserId(existingUser.id);

      if (!account) {
        c.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Account doesn't exist!");
      }

      if (!account.password) {
        c.status(StatusCodes.FORBIDDEN);
        throw new Error("Use another method to login");
      }

      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        c.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Wrong password");
      }

      await setSession(existingUser.id);
      return c.redirect("/");
    } catch (error) {
      throw error;
    }
  })
  .post("/signup", zValidator("json", signupSchema), async (c) => {
    const { email, fullName, password } = c.req.valid("json");

    try {
      const exisitingUser = await getUserByEmail(email);

      if (exisitingUser) {
        c.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Account already exixts");
      }

      const hashedPassword = await bcrypt.hash(password!, 12);

      const user = await createUser(email);

      await createAccount(user.id, hashedPassword);

      await createProfile(user.id, fullName);

      await setSession(user.id);

      return c.redirect(afterLogin);
    } catch (error) {
      throw error;
    }
  });

route.get("/logout", async (c) => {
  const { session } = await validateRequest();
  if (!session) {
    return c.redirect("/login");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return c.redirect("/login");
});

route
  .get("/google", async (c) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const authorizationURL = await googleClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["profile", "email"],
      },
    );

    cookies().set("google_oauth_state", state, {
      secure: true,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
    });

    cookies().set("google_code_verifier", codeVerifier, {
      secure: true,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10,
    });

    return c.redirect(authorizationURL.toString());
  })
  .get(
    "/google/callback",
    zValidator(
      "query",
      z.object({
        code: z.string().min(1),
        state: z.string().min(1),
      }),
    ),
    async (c) => {
      const url = new URL(c.req.url);

      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      const storedState = cookies().get("google_oauth_state")?.value ?? null;
      const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

      if (
        !code ||
        !state ||
        !storedState ||
        state !== storedState ||
        !codeVerifier
      ) {
        c.status(StatusCodes.BAD_REQUEST);
        throw new Error();
      }
      try {
        const tokens = await googleClient.validateAuthorizationCode(
          code,
          codeVerifier,
        );

        const response = await fetch(
          "https://openidconnect.googleapis.com/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );

        const googleUser: GoogleUser = await response.json();

        const existingAccount = await getAccountByGoogleId(googleUser.sub);

        if (existingAccount) {
          await setSession(existingAccount.userId);
          c.status(StatusCodes.MOVED_TEMPORARILY);
          c.header("Location", afterLogin);

          return c.json(null);
        }

        const userId = await createGoogleUser(googleUser);

        await setSession(userId);
        c.status(StatusCodes.MOVED_TEMPORARILY);
        c.header("Location", afterLogin);
        return c.json(null);
      } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
          // invalid code
          c.status(StatusCodes.BAD_REQUEST);
          throw e;
        }
        c.status(StatusCodes.INTERNAL_SERVER_ERROR);
        throw e;
      }
    },
  );

export default route;

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
