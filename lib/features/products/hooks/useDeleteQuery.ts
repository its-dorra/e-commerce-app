import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useDeleteQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteQueryString = (name: string) => {
    const params = new URLSearchParams(searchParams);
    return params.toString();
  };

  return (name: string) => {
    router.replace(pathname + "?" + deleteQueryString(name));
  };
};
