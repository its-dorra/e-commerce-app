import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useAppendQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appendQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);
      return params.toString();
    },
    [searchParams],
  );
  return (name: string, value: string) => {
    window.history.pushState(null, "", `?${appendQueryString(name, value)}`);
    // router.push(pathname + "?" + appendQueryString(name, value));
  };
};
