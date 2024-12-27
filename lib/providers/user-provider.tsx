"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../features/user/services";

interface UserContext {
  user: Awaited<ReturnType<typeof getCurrentUser>> | null;
}

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserContext["user"]>(null);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    })();
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
