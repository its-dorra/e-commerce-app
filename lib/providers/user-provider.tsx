"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { useUser as useUserQuery } from "../features/user/hooks/useUser";

interface UserContext {
  user?: {
    id: string;
    email: string;
    role: "user" | "admin" | null;
    createdAt: Date | null;
    profile: {
      id: string;
      createdAt: Date | null;
      userId: string;
      updatedAt: Date | null;
      displayName: string | null;
      imageId: string | null;
      image: string | null;
      bio: string;
    } | null;
  };
}

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const { data: user } = useUserQuery();

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useSession is used outside of its provider");
  return context;
};
