import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useDeleteQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams],
  );
  return (name: string) => {
    router.push(pathname + "?" + deleteQueryString(name));
  };
};
