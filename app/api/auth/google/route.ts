import { googleClient } from "@/server/lucia";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const authorizationURL = await googleClient.createAuthorizationURL(
    state,
    codeVerifier,
    {
      scopes: ["profile", "email"],
    },
  );

  (await cookies()).set("google_oauth_state", state, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  (await cookies()).set("google_code_verifier", codeVerifier, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });
  return NextResponse.redirect(authorizationURL);
};
