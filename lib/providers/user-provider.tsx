"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { getCurrentUser } from "../features/user/services";
import { useQueryClient } from "@tanstack/react-query";

interface UserContext {
  user: Awaited<ReturnType<typeof getCurrentUser>> | null;
}

export const authEvents = {
  authChange: "auth-change",
};

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserContext["user"]>(null);
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    const fetchSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        queryClient.clear();
      }
    };

    fetchSession();

    window.addEventListener(authEvents.authChange, fetchSession);

    return () =>
      window.removeEventListener(authEvents.authChange, fetchSession);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useSession is used outside of its provider");
  return context;
};
