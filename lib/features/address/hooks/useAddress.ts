import { clientTrpc } from "@/lib/trpc/client";

export const useAddress = () => clientTrpc.address.getUserAddress.useQuery();
