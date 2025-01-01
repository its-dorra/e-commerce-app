import { cookies } from "next/headers";
import { lucia } from ".";
import type { Session, User } from "lucia";
import { cache } from "react";
import { UserId } from "lucia";
import { AdminAuthenticationError, AuthenticationError } from "@/lib/utils";


export const setSession = async (userId: UserId) => {
  const session = await lucia.createSession(userId, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId =
      (await cookies()).get(lucia.sessionCookieName)?.value || null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result?.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export const assertAdmin = async () => {
  const user = await assertAuthenticated();

  if (user.role !== "admin") throw new AdminAuthenticationError();

  return user;
};

export const isAdmin = async () => {
  const user = await getCurrentUser();

  return user?.role === "admin";
};
