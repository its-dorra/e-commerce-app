import { clientTrpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";

export const useAdminOrders = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  return clientTrpc.orders.getOrders.useQuery({ page, perPage: 6 });
};
