import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getCart } from "../services";


const queryKey = ['cart']

export const useCart = () => {
  return useQuery({
    queryKey,
    queryFn: getCart,
  });
};

export default queryKey
