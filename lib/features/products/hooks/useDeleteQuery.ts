import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useDeleteQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      return params.toString();
    },
    [searchParams],
  );
  return (name: string, value: string) => {
    router.push(pathname + "?" + deleteQueryString(name, value));
  };
};
