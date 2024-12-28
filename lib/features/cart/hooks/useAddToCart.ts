import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart } from "../services";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast.success("Item added to cart successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Can't add item to cart . Plz try again");
    },
  });
};
