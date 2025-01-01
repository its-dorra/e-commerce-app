import { googleClient } from "@/server/lucia";
import {
  createGoogleUser,
  getAccountByGoogleId,
} from "@/server/lucia/oauth-google";
import { setSession } from "@/server/lucia/utils";
import { GoogleUser } from "@/server/routers/users";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { afterLogin } from "@/lib/constants/app-config";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState =
    (await cookies()).get("google_oauth_state")?.value ?? null;
  const codeVerifier =
    (await cookies()).get("google_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
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
      return new Response(null, {
        status: 302,
        headers: {
          Location: afterLogin,
        },
      });
    }

    const userId = await createGoogleUser(googleUser);

    await setSession(userId);
    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLogin,
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
