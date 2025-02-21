import { clientTrpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";

export const useAdminOrders = () => {
  const searchParams = useSearchParams();
  const utils = clientTrpc.useUtils();

  const page = Number(searchParams.get("page") || 1);

  utils.orders.getOrders.prefetch({ page: page + 1, perPage: 8 });
  if (page > 1) {
    utils.orders.getOrders.prefetch({ page: page - 1, perPage: 8 });
  }

  return clientTrpc.orders.getOrders.useQuery({ page, perPage: 8 });
};
