import { clientTrpc } from "@/lib/trpc/client";
import { skipToken } from "@tanstack/react-query";

export const useUser = () =>
  clientTrpc.auth.getCurrentUser.useQuery(skipToken, {
    retry: false,
  });
