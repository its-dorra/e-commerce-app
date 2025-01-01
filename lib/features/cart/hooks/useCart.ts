import { clientTrpc } from "@/lib/trpc/client";

export const useCart = () => clientTrpc.carts.getCart.useQuery();
