import { clientTrpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignup = () => {
  const router = useRouter();

  return clientTrpc.auth.signup.useMutation({
    onSuccess: () => {
      toast.success("You created an account successfully , Enjoy your session");
      router.replace("/");
    },
    onError: (error) => {
      toast.error("Something went wrong \n" + error.message);
    },
  });
};
