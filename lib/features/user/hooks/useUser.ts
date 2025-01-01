import { clientTrpc } from "@/lib/trpc/client";

export const useUser = () => clientTrpc.auth.getCurrentUser.useQuery();
