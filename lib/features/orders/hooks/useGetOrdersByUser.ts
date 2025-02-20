import { clientTrpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";

export const useGetOrdersByUser = () => {
  const searchParams = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  return clientTrpc.orders.getOrdersByUser.useQuery({
    page: currentPage,
    perPage: 6,
  });
};
