import { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { cache } from "react";
import { getCurrentUser } from "./lucia/utils";

export const createContext = cache(async () => {
  const user = await getCurrentUser();

  return { user };
});

export type Context = Awaited<ReturnType<typeof createContext>>;
