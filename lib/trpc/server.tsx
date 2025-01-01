import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { makeQueryClient } from "./query-client";
import { appRouter } from "@/server/main";
import { createCallerFactory } from "@/server/trpc";
import { createContext } from "@/server/context";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);
export const { trpc: serverTrpc, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
