import { z } from "zod";
import { loginSchema, signupSchema } from "@/server/schemas/users";
import api from "@/lib/api";

export const login = async (json: z.infer<typeof loginSchema>) => {
  const res = await api.auth.login.$post({ json });

  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();

  return data;
};

export const signup = async (json: z.infer<typeof signupSchema>) => {
  const res = await api.auth.signup.$post({ json });

  if (!res.ok) throw new Error(res.statusText);

  const data = await res.json();

  return data;
};

export const getCurrentUser = async () => {
  const res = await api.auth.user.$get(undefined, {
    fetch(input, requestInit, Env, executionCtx) {
      const config = {
        ...requestInit,
        next: {
          ...requestInit?.next,
          revalidate: 0,
        },
      } satisfies RequestInit;

      return fetch(input, config);
    },
  });

  if (!res.ok) throw new Error("Can't get current user");

  return res.json();
};

export const logout = async () => {
  const res = await api.auth.logout.$post();

  if (!res.ok) throw new Error("Can't log out");

  return res.json();
};
