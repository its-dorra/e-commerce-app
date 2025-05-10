import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useDeleteQuery = () => {
  const searchParams = useSearchParams();
  const deleteQueryString = (name: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    value ? params.delete(name, value) : params.delete(name);
    return params.toString();
  };

  return (name: string, value?: string) => {
    window.history.pushState(null, "", `?${deleteQueryString(name, value)}`);
    // router.replace(pathname + "?" + deleteQueryString(name));
  };
};
