import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export const getCurrentUser = async () => {
  const session = await getSession();
  return session?.user ?? undefined;
};

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
};

export const assertAdmin = async () => {
  const user = await assertAuthenticated();
  if (user.role !== "admin") {
    redirect("/");
  }
  return user;
};

export const isAdmin = async () => {
  const user = await getCurrentUser();
  return user?.role === "admin";
};
