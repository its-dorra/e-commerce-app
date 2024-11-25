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
