import { clientTrpc } from "@/lib/trpc/client";

export const useColors = clientTrpc.filters.colors.useQuery;

export const useCategories = clientTrpc.filters.categories.useQuery;

export const useSizes = clientTrpc.filters.sizes.useQuery;
