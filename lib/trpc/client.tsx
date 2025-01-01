"use client";

import superjson from "superjson";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { makeQueryClient } from "../trpc/query-client";
import type { AppRouter } from "@/server/main";

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}

export const clientTrpc = createTRPCReact<AppRouter>();

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    clientTrpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <clientTrpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </clientTrpc.Provider>
  );
}
