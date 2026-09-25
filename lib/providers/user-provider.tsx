"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { authClient } from "@/lib/auth-client";

export interface UserContextType {
  user?: {
    id: string;
    email: string;
    role: "user" | "admin" | null;
    createdAt?: Date | null;
    profile: {
      displayName: string | null;
      image: string | null;
    } | null;
  } | null;
  isPending?: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        role: ((session.user as any).role as "user" | "admin") || "user",
        createdAt: session.user.createdAt
          ? new Date(session.user.createdAt)
          : null,
        profile: {
          displayName: session.user.name || null,
          image: session.user.image || null,
        },
      }
    : null;

  return (
    <UserContext.Provider value={{ user, isPending }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser is used outside of its provider");
  return context;
};
